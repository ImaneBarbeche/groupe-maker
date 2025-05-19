import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Liste, Eleve } from '../../models/utilisateur.interface';
@Component({
  selector: 'app-groupes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css'],
})
export class GroupesComponent {
  nouveauNomGroupe: string = '';
  groupes: { nom: string; eleves: Eleve[] }[] = [];
nombreDeGroupes: number | null = null;

  listes: Liste[] = [];
  listeSelectionnee!: Liste;
  elevesDisponibles: Eleve[] = [];

  constructor() {
    this.groupes = JSON.parse(localStorage.getItem('groupes') || '[]');
  }

  creerGroupe() {
    if (!this.nouveauNomGroupe.trim()) {
      alert('Le nom du groupe ne peut pas être vide.');
      return;
    }

    const nouveauGroupe = { nom: this.nouveauNomGroupe.trim(), eleves: [] };
    this.groupes.push(nouveauGroupe);
    this.nouveauNomGroupe = '';

    localStorage.setItem('groupes', JSON.stringify(this.groupes));
  }

  supprimerGroupe(index: number) {
    this.groupes.splice(index, 1);

    if (this.groupes.length === 0) {
      localStorage.removeItem('groupes');
    } else {
      localStorage.setItem('groupes', JSON.stringify(this.groupes));
    }
  }

  ngOnInit() {
    // On récupère depuis le localStorage l’utilisateur actuellement connecté (normalement un formateur ici).
    //localStorage.getItem(...) donne une chaîne de caractères JSON
    //JSON.parse(...) la transforme en objet utilisable en TypeScript
    // Si aucun utilisateur n’est connecté, on obtient null.
    const user = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
    if (user) {
      const key = `listes_${user.username}`; // On construit une clé dynamique pour récupérer ses listes. Par exemple : si user.username vaut "julie", alors la clé devient "listes_julie". Cette clé est celle qu’on a utilisée pour stocker les listes dans localStorage.
      /**On récupère les listes correspondant à cet utilisateur (formateur) :
Si elles existent → on les parse et on les stocke dans this.listes
Sinon → on stocke un tableau vide []
Cela permet ensuite d'afficher toutes les listes dans ton HTML, et d'en choisir une pour créer des groupes à partir de ses élèves. */
      this.listes = JSON.parse(localStorage.getItem(key) || '[]');
    } else {
      console.error('Aucun utilisateur actif trouvé dans le localStorage.');
    }

    this.groupes = JSON.parse(localStorage.getItem('groupes') || '[]'); //Enfin, on charge aussi les groupes déjà existants depuis le localStorage, pour les afficher ou les modifier.
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
    alert("Aucune liste sélectionnée.");
    return;
  }

  const elevesMelanges = [...this.elevesDisponibles].sort(() => Math.random() - 0.5);

  if (elevesMelanges.length === 0) {
    alert("Aucun élève dans la liste sélectionnée.");
    return;
  }

  if (!this.nombreDeGroupes || this.nombreDeGroupes < 1) {
  alert("Veuillez saisir un nombre de groupes valide.");
  return;
}
  // Génère les groupes automatiquement
  this.groupes = [];
  for (let i = 1; i <= this.nombreDeGroupes; i++) {
    this.groupes.push({ nom: `Groupe ${i}`, eleves: [] });
  }

  // Répartit les élèves
  for (let i = 0; i < elevesMelanges.length; i++) {
    const indexGroupe = i % this.nombreDeGroupes;
    this.groupes[indexGroupe].eleves.push(elevesMelanges[i]);
  }

  localStorage.setItem('groupes', JSON.stringify(this.groupes));
}
genererGroupesVides() {
  if (!this.nombreDeGroupes || this.nombreDeGroupes < 1) {
    alert("Veuillez saisir un nombre de groupes valide.");
    return;
  }

  this.groupes = [];
  for (let i = 1; i <= this.nombreDeGroupes; i++) {
    this.groupes.push({
      nom: `Groupe ${i}`,
      eleves: []
    });
  }

  localStorage.setItem('groupes', JSON.stringify(this.groupes));
}

}
