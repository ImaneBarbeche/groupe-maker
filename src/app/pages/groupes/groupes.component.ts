import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Liste, Eleve } from '../../models/utilisateur.interface';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { HistoriqueTirages } from '../../models/historique.interface';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-groupes',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css'],
})
export class GroupesComponent {

utilisateurActif: any; // Utilisateur actuellement connecté (formateur)
nombreDeGroupes: number | null = null; // Nombre de groupes à générer
mixDWWM = false; // Option : répartir DWWM et non-DWWM séparément

listes: Liste[] = []; // Toutes les listes du formateur actif
listeSelectionnee?: Liste; // Liste actuellement sélectionnée
elevesDisponibles: Eleve[] = []; // Élèves affichés et assignables
historiqueTirages: HistoriqueTirages[] = []; // Historique global (multi-tirages)


  get idsGroupes(): string[] {
    return this.listeSelectionnee?.groupes?.map((_, i) => `groupe-${i}`) || [];
  }

  constructor(private localStorageService: LocalStorageService) {}

ngOnInit() {
  // Récupération de l'utilisateur actif
  this.utilisateurActif = this.localStorageService.getUtilisateurActif();

  if (this.utilisateurActif) {
    // Récupération des listes liées à ce formateur
    this.listes = this.localStorageService.getListes(this.utilisateurActif.username);
  } else {
    console.error('Aucun utilisateur actif trouvé dans le localStorage.');
  }

  // Chargement de l’historique des tirages
  this.historiqueTirages = this.localStorageService.getHistorique();
}


/**
 * Lorsqu'une liste est sélectionnée :
 * - charge les élèves disponibles
 * - réinitialise la génération précédente
 * - désactive le tirage validé
 */
onListeSelectionnee() {
  if (this.listeSelectionnee) {
    this.elevesDisponibles = [...this.listeSelectionnee.eleves];

    this.listeSelectionnee.tirageValide = false;
    this.listeSelectionnee.groupes = [];
    this.nombreDeGroupes = null;

    this.localStorageService.setListes(this.utilisateurActif.username, this.listes);
  } else {
    this.elevesDisponibles = [];
  }
}

 /**
   * Supprime un groupe à partir de son nom
   */
  supprimerGroupeParNom(nom: string) {
    const groupes = this.listeSelectionnee?.groupes;
    if (!groupes) return;

    const index = groupes.findIndex(g => g.nom === nom);
    if (index !== -1) {
      groupes.splice(index, 1);
      this.localStorageService.setListes(this.utilisateurActif.username, this.listes);
    }
  }

    /**
   * Génère un ensemble de groupes vides selon le nombre saisi
   */
  genererGroupesVides() {
    if (!this.nombreDeGroupes || this.nombreDeGroupes < 1 || !this.listeSelectionnee) {
      alert('Veuillez saisir un nombre de groupes valide.');
      return;
    }

    this.listeSelectionnee.groupes = [];
    for (let i = 1; i <= this.nombreDeGroupes; i++) {
      this.listeSelectionnee.groupes.push({
        nom: `Groupe ${i}`,
        eleves: [],
      });
    }

    this.localStorageService.setListes(this.utilisateurActif.username, this.listes);
  }

    /**
   * Génère une répartition aléatoire des élèves en groupes, avec option mix DWWM
   */
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

    this.listeSelectionnee.groupes = [];
    for (let i = 1; i <= this.nombreDeGroupes; i++) {
      this.listeSelectionnee.groupes.push({ nom: `Groupe ${i}`, eleves: [] });
    }

    if (this.mixDWWM) {
      const anciensDWWM = this.elevesDisponibles.filter((e) => e.dwwmStudent);
      const nonDWWM = this.elevesDisponibles.filter((e) => !e.dwwmStudent);
      const dwwmMelanges = [...anciensDWWM].sort(() => Math.random() - 0.5);
      const autresMelanges = [...nonDWWM].sort(() => Math.random() - 0.5);

      for (let i = 0; i < dwwmMelanges.length; i++) {
        const index = i % this.listeSelectionnee.groupes.length;
        this.listeSelectionnee.groupes[index].eleves.push(dwwmMelanges[i]);
      }
      for (let i = 0; i < autresMelanges.length; i++) {
        const index = i % this.listeSelectionnee.groupes.length;
        this.listeSelectionnee.groupes[index].eleves.push(autresMelanges[i]);
      }
    } else {
      const elevesMelanges = [...this.elevesDisponibles].sort(() => Math.random() - 0.5);
      for (let i = 0; i < elevesMelanges.length; i++) {
        const index = i % this.listeSelectionnee.groupes.length;
        this.listeSelectionnee.groupes[index].eleves.push(elevesMelanges[i]);
      }
    }

    this.listeSelectionnee.tirageValide = false;
    this.localStorageService.setListes(this.utilisateurActif.username, this.listes);

  }

    /**
   * Permet de déplacer un élève d'un groupe à un autre avec drag and drop
   */
  deplacerEleve(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) return;
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

    /**
   * Valide un tirage en l'ajoutant à l'historique, et fixe les affectations
   */
  validerTirage() {
    if (!this.listeSelectionnee || this.listeSelectionnee.tirageValide || !this.listeSelectionnee.groupes?.length) return;
    if (!this.listeSelectionnee || this.listeSelectionnee.tirageValide) return;
    this.listeSelectionnee.tirageValide = true;

    const nouveauTirage: HistoriqueTirages = {
      date: new Date().toLocaleString(),
      listeNom: this.listeSelectionnee.nom,
      groupes: this.listeSelectionnee.groupes.map(groupe => ({
        nom: groupe.nom,
        eleves: groupe.eleves.map(e => ({ id: e.id, firstName: e.firstName }))
      }))
    };

    this.listeSelectionnee.groupes.forEach(groupe => {
      groupe.eleves.forEach(eleve => {
        const e = this.listeSelectionnee!.eleves.find(el => el.id === eleve.id);
        if (e) e.groupe = groupe.nom;
      });
    });

    this.historiqueTirages.push(nouveauTirage);
    this.localStorageService.setHistorique(this.historiqueTirages);
    this.localStorageService.setListes(this.utilisateurActif.username, this.listes);
  }

    /**
   * Annule le dernier tirage validé en le retirant de l'historique
   */
  annulerTirage() {
    if (!this.listeSelectionnee || !this.listeSelectionnee.tirageValide) return;

    const indexDernier = [...this.historiqueTirages]
      .reverse()
      .findIndex(t => t.listeNom === this.listeSelectionnee!.nom);

    if (indexDernier !== -1) {
      const indexRéel = this.historiqueTirages.length - 1 - indexDernier;
      this.historiqueTirages.splice(indexRéel, 1);
    }

    this.listeSelectionnee.tirageValide = false;
    this.localStorageService.setHistorique(this.historiqueTirages);
    this.localStorageService.setListes(this.utilisateurActif.username, this.listes);
  }
}
