import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-formateur',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-formateur.component.html',
  styleUrls: ['./dashboard-formateur.component.css'],
})
export class DashboardFormateurComponent {
  // Données de l’utilisateur actif
  utilisateurActif: any = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');

  // Liste des élèves
  totalEleves = 24;
  moyenneAge = 29;
  statsTechnique = '40% débutants, 30% intermédiaires, 30% avancés';

  // Groupes
  totalGroupes = 6;
  criteres = 'âge, DWWM, niveau technique';
  dernierTirage = '14 mai 2025';

  // Projets
  totalProjets = 5;
  projetsAssignes = 3;
  projetsEnAttente = 2;

  constructor(private router: Router) {}
}
