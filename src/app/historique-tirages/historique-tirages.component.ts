import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueTirages } from '../models/historique.interface';


@Component({
  selector: 'app-historique-tirages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-tirages.component.html',
  styleUrl: './historique-tirages.component.css'
})
export class HistoriqueTiragesComponent implements OnInit {
historique: HistoriqueTirages[] = [];

ngOnInit() {
  // On récupère depuis le localStorage l’historique des tirages
  const historiqueString = localStorage.getItem('historiqueTirages');
  if (historiqueString) {
    this.historique = JSON.parse(historiqueString);
  }
  // On vérifie si l’historique est vide
  if (this.historique.length === 0) {
    alert('Aucun tirage n\'a été effectué.');
  }

}
}
