import { Component, OnInit } from '@angular/core';
import { Eleve } from '../../models/eleve.interface';
import { HistoriqueTirages } from '../../models/historique.interface';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { StatistiquesService } from '../../services/statistiques.service';
import { DashboardStatistiquesComponent } from '../dashboard-statistiques/dashboard-statistiques.component';
import { DashboardGroupesValidesComponent } from '../dashboard-groupes-valides/dashboard-groupes-valides.component';
import { ListesService } from '../../services/listes.service';
import { HistoriqueService } from '../../services/historique.service';

@Component({
  selector: 'app-dashboard-formateur',
  standalone: true,
  imports: [DashboardStatistiquesComponent, DashboardGroupesValidesComponent],
  templateUrl: './dashboard-formateur.component.html',
  styleUrls: ['./dashboard-formateur.component.css'],
})
export class DashboardFormateurComponent implements OnInit {
  utilisateurActif: { username: string } | null = null;
  mesEleves: Eleve[] = [];

  totalEleves = 0;
  moyenneAge = 0;
  statsTechnique = '';

  mesGroupesValides: {
    nom: string;
    eleves: { id: string; firstName: string }[];
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
    this.utilisateurActif = this.accountService.getUtilisateurActif();
    if (!this.utilisateurActif) return;

    this.listesService.getListes().subscribe((toutesLesListes) => {
      this.historiqueService.getHistorique().subscribe((historique) => {
        const mesListes = toutesLesListes.filter(
          (l) =>
            l.formateurUsername?.toLowerCase().trim() ===
            this.utilisateurActif!.username.toLowerCase().trim()
        );

        const nomsDeMesListes = mesListes.map((l) => l.nom.toLowerCase());

        this.mesEleves = mesListes.flatMap((liste) => liste.eleves || []);
        this.totalEleves = this.mesEleves.length;
        this.moyenneAge = this.statsService.calculerMoyenne(
          this.mesEleves.map((e) => e.age)
        );
        this.statsTechnique = this.statsService.calculerStatsTech(
          this.mesEleves
        );

        const tiragesDuFormateur = historique.filter((t) =>
          nomsDeMesListes.includes(t.listeNom.toLowerCase())
        );
        this.mesGroupesValides = tiragesDuFormateur.flatMap((t) => t.groupes);
        this.dernierTirageValide =
          tiragesDuFormateur.length > 0
            ? tiragesDuFormateur.at(-1) || null
            : null;
      });
    });
  }

  supprimerMonCompte(): void {
    if (this.utilisateurActif) {
      this.accountService.supprimerCompteEtReinitialiser(
        this.utilisateurActif.username
      );
    }
  }
}
