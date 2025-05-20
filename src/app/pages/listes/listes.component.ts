import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Liste, Eleve } from '../../models/utilisateur.interface';
@Component({
  selector: 'app-listes',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './listes.component.html',
  styleUrl: './listes.component.css',
})
export class ListesComponent {
  listes: Liste[] = []; // liste de toutes les listes existantes
  // Quand le composant est affiché :
  // il récupère l'utilisateur actif,
  // il utilise une clé pour charger les listes personnelles, si aucune n'existe, il utilise un tableau vide
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
    const key = `listes_${user?.username}`;
    this.listes = JSON.parse(localStorage.getItem(key) || '[]');
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
