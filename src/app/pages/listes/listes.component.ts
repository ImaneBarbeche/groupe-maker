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
  listes: Liste[] = []; // liste de toutes les listes existantes

  constructor(
    private listesService: ListesService,
    private localStorageService: LocalStorageService
  ) {}

  // Quand le composant est affiché :
  // il récupère l'utilisateur actif,
  // il utilise une clé pour charger les listes personnelles, si aucune n'existe, il utilise un tableau vide
 ngOnInit() {
  const user = this.localStorageService.getUtilisateurActif();
  this.listes = this.localStorageService.getListes(user?.username);
  this.listesService.setListes(this.listes);
}



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

confirmDelete(id: string) {
  if (confirm('Voulez-vous vraiment supprimer cette liste ?')) {
    this.supprimerListe(id);
  }
}


}
