import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Liste } from '../../models/liste.interface';
import { Eleve } from '../../models/eleve.interface';
import { CdkDragDrop,DragDropModule,transferArrayItem } from '@angular/cdk/drag-drop';
import { HistoriqueTirages } from '../../models/historique.interface';
import { GroupesService } from '../../services/groupes.service';
import { GroupesDisplayComponent } from '../groupes-display/groupes-display.component';
import { GroupesConfigComponent } from '../groupes-config/groupes-config.component';
import { ListesService } from '../../services/listes.service';
import { ElevesService } from '../../services/eleves.service';
import { HistoriqueService } from '../../services/historique.service';

interface ConfigGeneration {
  nombreDeGroupes: number;
  equilibrerFrancais: boolean;
  equilibrerTechnique: boolean;
  mixDWWM: boolean;
  equilibrerProfil: boolean;
}

@Component({
  selector: 'app-groupes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    GroupesDisplayComponent,
    GroupesConfigComponent,
  ],
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css'],
})
export class GroupesComponent implements OnInit {
  listes: Liste[] = [];
  listeSelectionnee?: Liste;
  elevesDisponibles: Eleve[] = [];
  historiqueTirages: HistoriqueTirages[] = [];

  configGeneration: ConfigGeneration = {
    nombreDeGroupes: 0,
    equilibrerFrancais: false,
    equilibrerTechnique: false,
    mixDWWM: false,
    equilibrerProfil: false,
  };

  get idsGroupes(): string[] {
    return this.listeSelectionnee?.groupes?.map((_, i) => `groupe-${i}`) || [];
  }

  constructor(
    private listesService: ListesService,
    private elevesService: ElevesService,
    private groupesService: GroupesService,
    private historiqueService: HistoriqueService
  ) {}

  ngOnInit() {
    this.listesService
      .getListes()
      .subscribe((listes) => (this.listes = listes));
    this.historiqueService
      .getHistorique()
      .subscribe((hist) => (this.historiqueTirages = hist));
  }

  onListeChange(liste: Liste) {
    this.listeSelectionnee = liste;
    this.onListeSelectionnee();
  }

  onListeSelectionnee() {
    if (this.listeSelectionnee) {
      this.elevesDisponibles = [...this.listeSelectionnee.eleves];
      this.listeSelectionnee.tirageValide = false;
      this.listeSelectionnee.groupes = [];
      this.configGeneration.nombreDeGroupes = 0;
      this.listesService.updateListe(this.listeSelectionnee).subscribe();
    } else {
      this.elevesDisponibles = [];
    }
  }

  onConfigChange(config: ConfigGeneration) {
    this.configGeneration = { ...config };
  }

  lancerGeneration() {
    if (
      !this.listeSelectionnee?.id ||
      this.configGeneration.nombreDeGroupes < 1
    ) {
      alert('Sélectionnez une liste et un nombre de groupes valide.');
      return;
    }

    const idListe = Number(this.listeSelectionnee?.id);
    if (!idListe) {
      alert('ID de liste invalide.');
      return;
    }

    this.elevesService.getElevesParListe(idListe).subscribe({
      next: (eleves) => {
        // suite logique inchangée
      },
      error: (err) => {
        console.error('Erreur chargement élèves :', err);
      },
    });
  }

  deplacerEleve(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  validerTirage() {
    if (
      !this.listeSelectionnee ||
      this.listeSelectionnee.tirageValide ||
      !this.listeSelectionnee.groupes?.length
    ) {
      return;
    }

    const nouveauTirage = this.groupesService.validerTirage(
      this.listeSelectionnee
    );
    this.historiqueTirages.push(nouveauTirage);
    this.historiqueService.save(nouveauTirage).subscribe();
    this.listesService.updateListe(this.listeSelectionnee).subscribe();
  }

  annulerTirage() {
    if (!this.listeSelectionnee) return;

    this.historiqueTirages = this.groupesService.annulerDernierTirage(
      this.listeSelectionnee,
      this.historiqueTirages
    );

    this.historiqueService.saveAll(this.historiqueTirages).subscribe(); // méthode fictive
    this.listesService.updateListe(this.listeSelectionnee).subscribe();
  }

  supprimerGroupeParNom(nom: string) {
    const groupes = this.listeSelectionnee?.groupes;
    if (!groupes) return;

    const index = groupes.findIndex((g) => g.nom === nom);
    if (index !== -1) {
      groupes.splice(index, 1);
      this.listesService.updateListe(this.listeSelectionnee!).subscribe();
    }
  }
}
