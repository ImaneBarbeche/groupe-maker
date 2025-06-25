import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-statistiques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-statistiques.component.html',
  styleUrls: ['./dashboard-statistiques.component.css'],
})
export class DashboardStatistiquesComponent {
  @Input() totalPersonnes = 0;
  @Input() moyenneAge = 0;
  @Input() statsTechnique = '';
}
