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
    personnes: { id: string; prenom: string }[];
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
    this.accountService.getMonProfil().subscribe({
      next: (user) => {
        this.utilisateurActif = user;

        this.listesService.getListes().subscribe((toutesLesListes) => {
          this.historiqueService.getHistorique().subscribe((historique) => {
            const mesListes = toutesLesListes.filter(
              (l) =>
                l.utilisateur?.id === this.utilisateurActif?.id
            );

            const nomsDeMesListes = mesListes.map((l) => l.nom.toLowerCase());

            this.mesPersonnes = mesListes.flatMap((liste) => liste.personnes || []);
            this.totalPersonnes = this.mesPersonnes.length;
            this.moyenneAge = this.statsService.calculerMoyenne(
              this.mesPersonnes.map((p) => p.age)
            );
            this.statsTechnique = this.statsService.calculerStatsTech(this.mesPersonnes);

            const tiragesDeLutilisateur = historique.filter((t) =>
              nomsDeMesListes.includes(t.listeNom.toLowerCase())
            );

            this.mesGroupesValides = tiragesDeLutilisateur.flatMap((t) =>
              t.groupes.map((groupe) => ({
                nom: groupe.nom,
                personnes: groupe.personnes.map((p) => ({
                  id: p.id,
                  prenom: p.prenom,
                })),
              }))
            );

            this.dernierTirageValide =
              tiragesDeLutilisateur.length > 0 ? tiragesDeLutilisateur.at(-1) || null : null;
          });
        });
      },
      error: () => {
        this.router.navigate(['/connexion']);
      },
    });
  }

  supprimerMonCompte(): void {
    if (this.utilisateurActif) {
      this.accountService.supprimerCompteEtReinitialiser(this.utilisateurActif.id);
    }
  }
}
