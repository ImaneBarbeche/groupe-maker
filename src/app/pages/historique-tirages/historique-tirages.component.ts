import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueTirages } from '../../models/historique.interface';
import { LocalStorageService } from '../../core/local-storage.service';


@Component({
  selector: 'app-historique-tirages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-tirages.component.html',
  styleUrl: './historique-tirages.component.css'
})
export class HistoriqueTiragesComponent implements OnInit {
historique: HistoriqueTirages[] = [];

constructor(private localStorageService: LocalStorageService) {}

ngOnInit() {
  // On récupère depuis le localStorage l’historique des tirages
  this.historique = this.localStorageService.getHistorique();

  // On vérifie si l’historique est vide
  if (this.historique.length === 0) {
    alert('Aucun tirage n\'a été effectué.');
  }

}

supprimerTirage(index: number) {
  this.historique.splice(index, 1);
  this.localStorageService.setHistorique(this.historique);
}

}
