import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Liste} from '../../models/liste.interface';
import { ListesService } from '../../services/listes.service';
import { Router } from '@angular/router';
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
        private router: Router // Injection du service Router
  ) {}

  /**
   * Initialise le composant en récupérant les listes de l'utilisateur actif
   */
 ngOnInit() {
  this.listesService.getListes().subscribe((listes: Liste[]) => {
    this.listes = listes;
  });
}
  /**
   * Supprime une liste de l'utilisateur actif à partir de son ID
   */
 supprimerListe(id: string) {
  this.listesService.deleteListe(id).subscribe(() => {
    this.listes = this.listes.filter(l => l.id !== id);
  });
}
  /**
   * Affiche une confirmation avant suppression d'une liste
   */
confirmDelete(id: string) {
  if (confirm('Voulez-vous vraiment supprimer cette liste ?')) {
    this.supprimerListe(id);
  }
}

// Méthode pour naviguer vers la page de création de liste
  goToCreateList() {
    this.router.navigate(['/create-list']);
  }
}
