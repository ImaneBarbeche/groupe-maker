import { Injectable } from '@angular/core';
import { Eleve } from '../models/eleve.interface';
import { HistoriqueTirages } from '../models/historique.interface';
import { Liste } from '../models/liste.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class GroupesService {
  constructor(private http: HttpClient) {}

  genererGroupes(
    eleves: Eleve[],
    nombreGroupes: number,
    options: {
      equilibrerFrancais: boolean;
      equilibrerTechnique: boolean;
      mixDWWM: boolean;
      equilibrerProfil: boolean;
    }
  ): { nom: string; eleves: Eleve[] }[] {
    // 1. Créer les groupes vides
    const groupes = Array.from({ length: nombreGroupes }, (_, i) => ({
      nom: `Groupe ${i + 1}`,
      eleves: [] as Eleve[],
    }));

    // 2. Appliquer les critères d'équilibrage
    let elevesMelanges = [...eleves];

    if (options.equilibrerFrancais) {
      elevesMelanges.sort((a, b) => b.language - a.language);
    }

    if (options.equilibrerTechnique) {
      elevesMelanges.sort((a, b) => b.techLevel - a.techLevel);
    }

    if (options.mixDWWM) {
      const anciensDWWM = elevesMelanges.filter((e) => e.dwwmStudent);
      const autres = elevesMelanges.filter((e) => !e.dwwmStudent);
      elevesMelanges = [...anciensDWWM, ...autres];
    }

    if (options.equilibrerProfil) {
      elevesMelanges.sort((a, b) => a.profil.localeCompare(b.profil));
    }

    // 3. Répartition équitable
    for (let i = 0; i < elevesMelanges.length; i++) {
      const index = i % groupes.length;
      groupes[index].eleves.push(elevesMelanges[i]);
    }

    return groupes;
  }

  validerTirage(liste: Liste): HistoriqueTirages {
    // Marquer les groupes comme validés
    liste.tirageValide = true;

    // Création d’un nouveau tirage à enregistrer
    const nouveauTirage: HistoriqueTirages = {
      date: new Date().toLocaleString(),
      listeNom: liste.nom,
      groupes: liste.groupes!.map((groupe: { nom: any; eleves: any[] }) => ({
        nom: groupe.nom,
        eleves: groupe.eleves.map((e) => ({
          id: e.id,
          firstName: e.firstName,
        })),
      })),
    };

    // Mise à jour des élèves (ajout du groupe)
    liste.groupes!.forEach((groupe: { eleves: any[]; nom: any }) => {
      groupe.eleves.forEach((eleve) => {
        const e = liste.eleves.find((el: Eleve) => el.id === eleve.id);
        if (e) e.groupe = groupe.nom;
      });
    });

    return nouveauTirage;
  }

  annulerDernierTirage(
    liste: Liste,
    historique: HistoriqueTirages[]
  ): HistoriqueTirages[] {
    if (!liste.tirageValide) return historique;

    const indexDernier = [...historique]
      .reverse()
      .findIndex((t) => t.listeNom === liste.nom);

    if (indexDernier === -1) return historique;

    const indexRéel = historique.length - 1 - indexDernier;
    const copieHistorique = [...historique];
    copieHistorique.splice(indexRéel, 1);

    liste.tirageValide = false;

    return copieHistorique;
  }
  getGroupesAvecEleves(): Observable<any[]> {
  const token = localStorage.getItem('jwt');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<any[]>(
    'http://localhost:8080/groupes/personnes-par-liste',
    { headers }
  );
}

}
