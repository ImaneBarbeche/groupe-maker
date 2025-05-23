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
  
utilisateurActif: any; // utilisateur actuellement connecté (formateur)
mesEleves: Eleve[] = []; // liste des élèves associés à ce formateur

totalEleves: number = 0;
moyenneAge: number = 0;
statsTechnique: string = ''; // résumé en pourcentage des niveaux techniques

mesGroupesValides: {
  nom: string;
  eleves: { id: string; firstName: string }[];
}[] = []; // groupes des anciens tirages validés

dernierTirageValide: HistoriqueTirages | null = null;


  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

ngOnInit() {
  // Récupération du formateur actif
  this.utilisateurActif = this.localStorageService.getUtilisateurActif();

  // Récupération de toutes ses listes
  const toutesLesListes = this.localStorageService.getListes(
    this.utilisateurActif?.username
  );

  // Filtrage de tous les élèves associés aux listes de ce formateur
  const tousLesEleves = toutesLesListes.flatMap(
    (liste) => liste.eleves || []
  );
  this.mesEleves = tousLesEleves.filter(
    (eleve) => eleve.formateurUsername === this.utilisateurActif?.username
  );

  // Statistiques calculées dynamiquement
  this.totalEleves = this.mesEleves.length;
  this.moyenneAge = this.calculerMoyenne(this.mesEleves.map((e) => e.age));
  this.statsTechnique = this.calculerStatsTech(this.mesEleves);

  // Filtrage des listes du formateur (comparaison sécurisée)
  const mesListes = toutesLesListes.filter(
    (l) =>
      l.formateurUsername?.toLowerCase().trim() ===
      this.utilisateurActif?.username.toLowerCase().trim()
  );
  const nomsDeMesListes = mesListes.map((l) => l.nom.toLowerCase());

  // Récupération de l'historique des tirages
  const historique: HistoriqueTirages[] =
    this.localStorageService.getHistorique() || [];

  // Tous les groupes validés du formateur
  this.mesGroupesValides = historique
    .filter((t) => nomsDeMesListes.includes(t.listeNom.toLowerCase()))
    .flatMap((t) => t.groupes);

  // Dernier tirage uniquement
  const tiragesDuFormateur = historique.filter((t) =>
    nomsDeMesListes.includes(t.listeNom.toLowerCase())
  );
  this.dernierTirageValide =
    tiragesDuFormateur.length > 0
      ? tiragesDuFormateur[tiragesDuFormateur.length - 1]
      : null;
}


/**
 * Calcule la moyenne d'âge des élèves.
 */
calculerMoyenne(ages: number[]): number {
  const total = ages.reduce((acc, val) => acc + val, 0);
  return ages.length ? Math.round(total / ages.length) : 0;
}

/**
 * Calcule la répartition des niveaux techniques en pourcentages.
 */
calculerStatsTech(eleves: Eleve[]): string {
  const counts = [0, 0, 0, 0]; // niveaux 1 à 4
  eleves.forEach((e) => counts[e.techLevel - 1]++);
  const total = eleves.length;
  return counts
    .map((c, i) => `${Math.round((c / total) * 100)}% Niv ${i + 1}`)
    .join(', ');
}

/**
 * Supprime le compte formateur et recharge l'application à l'état initial.
 */
supprimerMonCompte() {
  this.localStorageService.supprimerUtilisateur(this.utilisateurActif.username);
  localStorage.removeItem('utilisateurActif');
  this.router.navigate(['/']).then(() => {
    location.reload(); // force un vrai rechargement visuel du header
  });
}

}
