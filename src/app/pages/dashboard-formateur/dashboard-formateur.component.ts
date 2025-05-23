import { Component, OnInit } from '@angular/core';
import { Eleve } from '../../models/utilisateur.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { HistoriqueTirages } from '../../models/historique.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-formateur',
  standalone: true,
  templateUrl: './dashboard-formateur.component.html',
  styleUrls: ['./dashboard-formateur.component.css'],
})
export class DashboardFormateurComponent implements OnInit {
  // Données de l’utilisateur actif
  utilisateurActif: any;
  mesEleves: Eleve[] = [];

  totalEleves: number = 0;
  moyenneAge: number = 0;
  statsTechnique: string = '';

  totalGroupes: number = 0;
  criteres: string = '';
  dernierTirage: string = '';

  mesGroupesValides: {
    nom: string;
    eleves: { id: string; firstName: string }[];
  }[] = [];

  dernierTirageValide: HistoriqueTirages | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.utilisateurActif = this.localStorageService.getUtilisateurActif();
    const toutesLesListes = this.localStorageService.getListes(
      this.utilisateurActif?.username
    );
   

    // On extrait les élèves liés à ce formateur
    const tousLesEleves = toutesLesListes.flatMap(
      (liste) => liste.eleves || []
    );
    this.mesEleves = tousLesEleves.filter(
      (eleve) => eleve.formateurUsername === this.utilisateurActif?.username
    );

    // Statistiques dynamiques
    this.totalEleves = this.mesEleves.length;
    this.moyenneAge = this.calculerMoyenne(this.mesEleves.map((e) => e.age));
    this.statsTechnique = this.calculerStatsTech(this.mesEleves);

    // En fin de ngOnInit()
    const mesListes = toutesLesListes.filter(
      (l) =>
        l.formateurUsername?.toLowerCase().trim() ===
        this.utilisateurActif?.username.toLowerCase().trim()
    );

    const nomsDeMesListes = mesListes.map((l) => l.nom.toLowerCase());

    const historique: HistoriqueTirages[] =
      this.localStorageService.getHistorique() || [];
    this.mesGroupesValides = historique
      .filter((t) => nomsDeMesListes.includes(t.listeNom.toLowerCase()))
      .flatMap((t) => t.groupes);
 

    const tiragesDuFormateur = historique.filter((t) =>
      nomsDeMesListes.includes(t.listeNom.toLowerCase())
    );

    this.dernierTirageValide =
      tiragesDuFormateur.length > 0
        ? tiragesDuFormateur[tiragesDuFormateur.length - 1]
        : null;
  
  }

  calculerMoyenne(ages: number[]): number {
    const total = ages.reduce((acc, val) => acc + val, 0);
    return ages.length ? Math.round(total / ages.length) : 0;
  }

  calculerStatsTech(eleves: Eleve[]): string {
    const counts = [0, 0, 0, 0]; // niveaux 1 à 4
    eleves.forEach((e) => counts[e.techLevel - 1]++);
    const total = eleves.length;
    return counts
      .map((c, i) => `${Math.round((c / total) * 100)}% Niv ${i + 1}`)
      .join(', ');
  }
  supprimerMonCompte() {
    this.localStorageService.supprimerUtilisateur(this.utilisateurActif.username);
    localStorage.removeItem('utilisateurActif');
    this.router.navigate(['/']).then(() => {
      location.reload(); // force un "vrai" rechargement visuel du header
    });
  }
}
