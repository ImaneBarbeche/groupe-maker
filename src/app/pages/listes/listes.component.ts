import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Eleve {
  id: string;                // identifiant unique
  username: string;          // identifiant choisi à l'inscription
  firstName: string;         // prénom
  age: number;
  gender: 'Féminin' | 'Masculin' | 'Ne préfère pas répondre';
  language: number;          // 0 à 4 (niveau français)
  techLevel: number;         // 0 à 3 (niveau technique)
  profil: 'Timide' | 'Réservé' | "À l'aise" | 'Leader';       
  dwwmStudent: boolean;
  cdaGroup: 'CDA Java' | 'CDA PHP';
}


interface Liste {
  id: string;
  nom: string;
  eleves: Eleve[];
  tirages: number;
}
@Component({
  selector: 'app-listes',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './listes.component.html',
  styleUrl: './listes.component.css',
})
export class ListesComponent {
  listes: Liste[] = []; // liste de toutes les listes existantes
  nouvelleListeNom = ''; // nom saisi dans le formulaire
  erreurNomExiste = false; // booléen pour afficher une erreur si le nom existe déjà

  // Quand le composant est affiché :
  // il récupère l'utilisateur actif,
  // il utilise une clé pour charger les listes personnelles, si aucune n'existe, il utilise un tableau vide
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
    const key = `listes_${user?.username}`;
    this.listes = JSON.parse(localStorage.getItem(key) || '[]');
  }

  creerListe() {
    this.erreurNomExiste = false; //on réinitialise l'erreur

    const nom = this.nouvelleListeNom.trim(); //on vérifie que le champ n'est pas vide
    if (!nom) return;

    //on relie les listes stockées car on va les modifier
    const user = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
    const key = `listes_${user?.username}`;
    const listes = JSON.parse(localStorage.getItem(key) || '[]');

    //on vérifie si une liste du même nom existe déjà,, insensible à la casse.
    // Si oui, on affiche un message d'erreur
    const existe = listes.some(
      (l: Liste) => l.nom.toLowerCase() === nom.toLowerCase()
    );
    if (existe) {
      this.erreurNomExiste = true;
      return;
    }

    //On crée un objet Liste avec un id unique, le nom saisi, une liste vide d’élèves et 0 tirage
    const nouvelleListe: Liste = {
      id: crypto.randomUUID(), // Génère automatiquement un identifiant unique et aléatoire
      nom, //C’est le nom saisi par l’utilisateur dans le formulaire
      eleves: [], // C’est une liste vide au départ
      tirages: 0, //  initialises à zéro le nombre de fois qu’on a généré des groupes à partir de cette liste
      //Ce champ servira pour l’historique de groupes
    };

    listes.push(nouvelleListe); // on l’ajoute au tableau
    localStorage.setItem(key, JSON.stringify(listes)); // on sauvegarde dans le localStorage
    this.listes = listes; // on met à jour l’affichage
    this.nouvelleListeNom = ''; // on vide le champ du formulaire
  }

  supprimerListe(id: string) {
    const user = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
    const key = `listes_${user?.username}`;
    const listes = JSON.parse(localStorage.getItem(key) || '[]');
    const index = this.listes.findIndex((liste) => liste.id === id); // on cherche l’index de la liste à supprimer
    // on vérifie si l’index est valide
    if (index !== -1) {
      listes.splice(index, 1); // on supprime la liste du tableau
      localStorage.setItem(key, JSON.stringify(listes)); // on sauvegarde dans le localStorage
      this.listes = listes; // on met à jour l’affichage
    }
  }
}
