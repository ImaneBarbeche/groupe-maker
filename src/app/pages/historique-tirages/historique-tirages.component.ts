import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueTirages } from '../../models/historique.interface';
import { HistoriqueService } from '../../services/historique.service';

@Component({
  selector: 'app-historique-tirages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-tirages.component.html',
  styleUrl: './historique-tirages.component.css',
})
export class HistoriqueTiragesComponent implements OnInit {
  historique: HistoriqueTirages[] = [];

  constructor(private historiqueService: HistoriqueService) {}

  ngOnInit() {
    this.historiqueService.getHistorique().subscribe((hist) => {
      this.historique = hist;
      if (hist.length === 0) {
        alert("Aucun tirage n'a été effectué.");
      }
    });
  }
  supprimerTirage(index: number) {
    this.historique.splice(index, 1);
    this.historiqueService.saveAll(this.historique).subscribe();
  }
}
