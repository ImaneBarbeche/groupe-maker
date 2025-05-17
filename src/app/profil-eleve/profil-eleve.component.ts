import { Component } from '@angular/core';
import { AuthserviceService } from '../core/authservice.service';

@Component({
  selector: 'app-profil-eleve',
  standalone: true,
  imports: [],
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.css'],
})
export class ProfilEleveComponent {
  user: any;
  username: string | undefined;
  role: string | undefined;

  projets = [
    {
      titre: 'Développement Java',
      statut: 'en cours',
      groupe: 'Groupe 2',
    },
    {
      titre: 'Landing page HTML/CSS',
      statut: 'terminé',
      groupe: 'Groupe 1',
    },
  ];

  constructor(private authService: AuthserviceService) {
    this.username = this.authService.currentUser?.username;
    this.role = this.authService.userRole;
    this.user = JSON.parse(localStorage.getItem('utilisateurActif') || '{}');

  }
}
