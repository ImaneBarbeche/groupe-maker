import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Liste, Eleve } from '../../models/utilisateur.interface';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { HistoriqueTirages } from '../../models/historique.interface';
import { LocalStorageService } from '../../core/local-storage.service';
@Component({
  selector: 'app-groupes',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css'],
})
export class GroupesComponent {
  utilisateurActif: any;

  groupes: { nom: string; eleves: Eleve[] }[] = [];
  nombreDeGroupes: number | null = null;
  mixDWWM: boolean = false;

  listes: Liste[] = [];
  listeSelectionnee!: Liste;
  elevesDisponibles: Eleve[] = [];

  tirageValide: boolean = false;
  historiqueTirages: HistoriqueTirages[] = [];
  get idsGroupes(): string[] {
    return this.groupes.map((_, i) => `groupe-${i}`);
  }



  constructor(private localStorageService: LocalStorageService) {}

  supprimerGroupe(index: number) {
    this.groupes.splice(index, 1);

    if (this.groupes.length === 0) {
      this.localStorageService.removeGroupes();
    } else {
      this.localStorageService.setGroupes(this.groupes);
    }
  }

  ngOnInit() {
    // On récupère l'utilisateur actif depuis le localStorage
    this.utilisateurActif = this.localStorageService.getUtilisateurActif();
    if (this.utilisateurActif) {
      // Charge les listes liées à l'utilisateur connecté
      this.listes = this.localStorageService.getListes(
        this.utilisateurActif.username
      );
    } else {
      console.error('Aucun utilisateur actif trouvé dans le localStorage.');
    }
    // Charge les groupes existants
    this.groupes = this.localStorageService.getGroupes();
    this.historiqueTirages = this.localStorageService.getHistorique();
  }

  onListeSelectionnee() {
    if (this.listeSelectionnee) {
      this.elevesDisponibles = [...this.listeSelectionnee.eleves];
    } else {
      this.elevesDisponibles = [];
    }
  }

  genererRepartition() {
    if (!this.listeSelectionnee) {
      alert('Aucune liste sélectionnée.');
      return;
    }

    if (!this.nombreDeGroupes || this.nombreDeGroupes < 1) {
      alert('Veuillez saisir un nombre de groupes valide.');
      return;
    }

    if (this.elevesDisponibles.length === 0) {
      alert('Aucun élève dans la liste sélectionnée.');
      return;
    }

    // Réinitialise les groupes
    this.groupes = [];
    for (let i = 1; i <= this.nombreDeGroupes; i++) {
      this.groupes.push({ nom: `Groupe ${i}`, eleves: [] });
    }

    // Si mixDWWM est activé → répartition par sous-groupes
    if (this.mixDWWM) {
      const anciensDWWM = this.elevesDisponibles.filter((e) => e.dwwmStudent);
      const nonDWWM = this.elevesDisponibles.filter((e) => !e.dwwmStudent);

      const dwwmMelanges = [...anciensDWWM].sort(() => Math.random() - 0.5);
      const autresMelanges = [...nonDWWM].sort(() => Math.random() - 0.5);

      // Répartit les anciens DWWM
      for (let i = 0; i < dwwmMelanges.length; i++) {
        const indexGroupe = i % this.groupes.length;
        this.groupes[indexGroupe].eleves.push(dwwmMelanges[i]);
      }

      // Répartit les autres élèves
      for (let i = 0; i < autresMelanges.length; i++) {
        const indexGroupe = i % this.groupes.length;
        this.groupes[indexGroupe].eleves.push(autresMelanges[i]);
      }
    } else {
      // Répartition simple aléatoire
      const elevesMelanges = [...this.elevesDisponibles].sort(
        () => Math.random() - 0.5
      );
      for (let i = 0; i < elevesMelanges.length; i++) {
        const indexGroupe = i % this.groupes.length;
        this.groupes[indexGroupe].eleves.push(elevesMelanges[i]);
      }
    }

    this.localStorageService.setGroupes(this.groupes);

  }

  genererGroupesVides() {
    if (!this.nombreDeGroupes || this.nombreDeGroupes < 1) {
      alert('Veuillez saisir un nombre de groupes valide.');
      return;
    }

    this.groupes = [];
    for (let i = 1; i <= this.nombreDeGroupes; i++) {
      this.groupes.push({
        nom: `Groupe ${i}`,
        eleves: [],
      });
    }

    this.localStorageService.setGroupes(this.groupes);
  }

  deplacerEleve(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  validerTirage() {
    this.tirageValide = true;

    const nouveauTirage: HistoriqueTirages = {
      date: new Date().toLocaleString(),
      listeNom: this.listeSelectionnee.nom,
      groupes: this.groupes.map((groupe) => ({
        nom: groupe.nom,
        eleves: groupe.eleves.map((eleve) => ({
          id: eleve.id,
          firstName: eleve.firstName,
        })),
      })),
    };

    // Met à jour les élèves dans la liste sélectionnée
    this.groupes.forEach((groupe) => {
      groupe.eleves.forEach((eleve) => {
        const eleveDansListe = this.listeSelectionnee.eleves.find(
          (e) => e.id === eleve.id
        );
        if (eleveDansListe) {
          eleveDansListe.groupe = groupe.nom;
        }
      });
    });

    this.historiqueTirages.push(nouveauTirage);

    this.localStorageService.setHistorique(this.historiqueTirages);

    this.localStorageService.setListes(this.utilisateurActif.username, this.listes);
  }
}
