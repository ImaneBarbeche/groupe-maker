// src/app/services/groupes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Liste } from '../models/liste.interface';
import { Personne } from '../models/personne.interface';
import { HistoriqueTirages } from '../models/historique.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupesService {
  constructor(private http: HttpClient) {}

  genererGroupes(
  personnes: Personne[],
  options: {
    nombreDeGroupes: number;
    equilibrerFrancais: boolean;
    equilibrerTechnique: boolean;
    mixDWWM: boolean;
    equilibrerProfil: boolean;
  }
): { nom: string; personnes: Personne[] }[] {
  const groupes = Array.from({ length: options.nombreDeGroupes }, (_, i) => ({
    nom: `Groupe ${i + 1}`,
    personnes: [] as Personne[],
  }));

  let melange = [...personnes];

  if (options.equilibrerFrancais) {
    melange.sort((a, b) => b.aisanceFr - a.aisanceFr);
  }

  if (options.equilibrerTechnique) {
    melange.sort((a, b) => b.niveauTechnique - a.niveauTechnique);
  }

  if (options.mixDWWM) {
    const anciens = melange.filter((p) => p.ancienDWWM);
    const autres = melange.filter((p) => !p.ancienDWWM);
    melange = [...anciens, ...autres];
  }

  if (options.equilibrerProfil) {
    melange.sort((a, b) => a.profil.localeCompare(b.profil));
  }

  melange.forEach((p, index) => {
    const groupeIndex = index % groupes.length;
    groupes[groupeIndex].personnes.push(p);
  });

  return groupes;
}


  validerTirage(liste: Liste, groupes: { nom: string; personnes: Personne[] }[]): HistoriqueTirages {
    liste.tirageValide = true;

    // Mise à jour des groupes dans les personnes
    groupes.forEach(groupe => {
      groupe.personnes.forEach(personne => {
        personne.groupe = groupe.nom;
      });
    });

    const tirage: HistoriqueTirages = {
      date: new Date().toLocaleString(),
      listeNom: liste.nom,
      groupes: groupes.map(g => ({
        nom: g.nom,
        personnes: g.personnes.map(p => ({
          id: p.id,
          nom: p.nom // Correct: utilise p.nom directement
        }))
      })),
    };

    return tirage;
  }

  annulerDernierTirage(
    liste: Liste,
    historique: HistoriqueTirages[]
  ): HistoriqueTirages[] {
    if (!liste.tirageValide) return historique;

    const indexDernier = [...historique].reverse().findIndex(t => t.listeNom === liste.nom);
    if (indexDernier === -1) return historique;

    const indexRéel = historique.length - 1 - indexDernier;
    const copie = [...historique];
    copie.splice(indexRéel, 1);

    liste.tirageValide = false;
    return copie;
  }

  // Récupération côté backend
  getPersonnesParListe(): Observable<Personne[]> {
    return this.http.get<Personne[]>('http://localhost:8080/groupes/personnes-par-liste', {
      withCredentials: true,
    });
  }
}
