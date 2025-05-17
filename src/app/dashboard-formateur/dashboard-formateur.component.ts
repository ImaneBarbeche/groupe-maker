import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-formateur',
  imports: [],
  standalone: true,
  templateUrl: './dashboard-formateur.component.html',
  styleUrls: ['./dashboard-formateur.component.css']
})
export class DashboardFormateurComponent {
  user: any;
  
  constructor(private router: Router) {
this.user = JSON.parse(localStorage.getItem('utilisateurActif') || '{}');

;}
goTo(path: string) {
  this.router.navigate([path]);
}
}
