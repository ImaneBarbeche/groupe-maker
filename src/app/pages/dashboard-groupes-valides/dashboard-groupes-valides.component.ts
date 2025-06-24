import { Component, Input } from '@angular/core';
import { HistoriqueTirages } from '../../models/historique.interface';

@Component({
  selector: 'app-dashboard-groupes-valides',
  standalone: true,
  templateUrl: './dashboard-groupes-valides.component.html',
  styleUrls: ['./dashboard-groupes-valides.component.css'],
})
export class DashboardGroupesValidesComponent {
  @Input() dernierTirageValide: HistoriqueTirages | null = null;
}
