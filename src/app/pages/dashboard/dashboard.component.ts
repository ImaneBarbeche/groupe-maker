import { Component, OnInit } from '@angular/core';
import { HistoriqueTirages } from '../../models/historique.interface';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { StatistiquesService } from '../../services/statistiques.service';
import { DashboardStatistiquesComponent } from '../dashboard-statistiques/dashboard-statistiques.component';
import { DashboardGroupesValidesComponent } from '../dashboard-groupes-valides/dashboard-groupes-valides.component';
import { ListesService } from '../../services/listes.service';
import { HistoriqueService } from '../../services/historique.service';
import { Utilisateur } from '../../models/utilisateur.interface';
import { Personne } from '../../models/personne.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardStatistiquesComponent, DashboardGroupesValidesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  utilisateurActif: Utilisateur | null = null;
  mesPersonnes: Personne[] = [];

  totalPersonnes = 0;
  moyenneAge = 0;
  statsTechnique = '';

  mesGroupesValides: {
    nom: string;
    personnes: { id: string; nom: string }[]; // Changé de "prenom" à "nom"
  }[] = [];

  dernierTirageValide: HistoriqueTirages | null = null;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private statsService: StatistiquesService,
    private listesService: ListesService,
    private historiqueService: HistoriqueService
  ) {}

  ngOnInit(): void {
    // Simplification : charger directement toutes les listes et historiques
    // sans filtrer par utilisateur pour l'instant
    this.chargerDonneesDashboard();
  }

  chargerDonneesDashboard(): void {
    this.listesService.getListes().subscribe({
      next: (toutesLesListes) => {
        this.historiqueService.getHistorique().subscribe({
          next: (historique) => {
            // Pour l'instant, utiliser toutes les listes (simplification)
            // TODO: Implémenter un filtrage par session utilisateur si nécessaire
            this.mesPersonnes = toutesLesListes.flatMap((liste) => liste.personnes || []);
            this.totalPersonnes = this.mesPersonnes.length;
            this.moyenneAge = this.statsService.calculerMoyenne(
              this.mesPersonnes.map((p) => p.age)
            );
            this.statsTechnique = this.statsService.calculerStatsTech(this.mesPersonnes);

            this.mesGroupesValides = historique.flatMap((t) =>
              t.groupes.map((groupe) => ({
                nom: groupe.nom,
                personnes: groupe.personnes.map((p) => ({
                  id: p.id,
                  nom: p.nom,
                })),
              }))
            );

            this.dernierTirageValide = historique.length > 0 ? historique.at(-1) || null : null;
          },
          error: (err) => {
            console.error('Erreur lors du chargement de l\'historique:', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des listes:', err);
      }
    });
  }

  supprimerMonCompte(): void {
    if (this.utilisateurActif) {
      this.accountService.supprimerCompteEtReinitialiser(this.utilisateurActif.id);
    }
  }
}
