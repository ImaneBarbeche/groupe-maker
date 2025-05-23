import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Liste} from '../../models/utilisateur.interface';
import { ListesService } from '../../services/listes.service';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-listes',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './listes.component.html',
  styleUrl: './listes.component.css',
})
export class ListesComponent {
  listes: Liste[] = []; // Liste de toutes les listes liées à l'utilisateur actif

  constructor(
    private listesService: ListesService,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Initialise le composant en récupérant les listes de l'utilisateur actif
   */
 ngOnInit() {
  const user = this.localStorageService.getUtilisateurActif();
  this.listes = this.localStorageService.getListes(user?.username);
  this.listesService.setListes(this.listes);
}


  /**
   * Supprime une liste de l'utilisateur actif à partir de son ID
   */
 supprimerListe(id: string) {
  const user = this.localStorageService.getUtilisateurActif();
  const listes = this.localStorageService.getListes(user?.username);
  const index = listes.findIndex((liste) => liste.id === id);

  if (index !== -1) {
    listes.splice(index, 1);
    this.localStorageService.setListes(user?.username, listes);
    this.listes = listes;
  }
}
  /**
   * Affiche une confirmation avant suppression d'une liste
   */
confirmDelete(id: string) {
  if (confirm('Voulez-vous vraiment supprimer cette liste ?')) {
    this.supprimerListe(id);
  }
}


}
