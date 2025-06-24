import { Component, Input } from '@angular/core';
import { Eleve } from '../../models/eleve.interface';

@Component({
  selector: 'app-dashboard-statistiques',
  standalone: true,
  templateUrl: './dashboard-statistiques.component.html',
  styleUrls: ['./dashboard-statistiques.component.css'],
})
export class DashboardStatistiquesComponent {
  @Input() totalEleves!: number;
  @Input() moyenneAge!: number;
  @Input() statsTechnique!: string;
}

