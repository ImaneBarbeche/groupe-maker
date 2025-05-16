import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthserviceService } from '../../core/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

/**
 * Composant de la page de connexion.
 * 
 * Permet à l'utilisateur (élève ou formateur) de :
 * - Saisir son nom d'utilisateur
 * - Sélectionner son rôle
 * - Se connecter en appelant le service d'authentification
 * - Être redirigé vers une interface différente selon son rôle
 * 
 * Utilise [(ngModel)] pour la liaison des champs,
 * et FormsModule pour la gestion du formulaire.
 */

export class ConnexionComponent {

username: string = '';
role = 'eleve';

constructor(private authService: AuthserviceService, private router: Router) { }

/**
 * Appelée lors de la soumission du formulaire de connexion.
 * - Enregistre l'utilisateur via AuthserviceService
 * - Redirige vers la route correspondante selon le rôle
 */

onSubmit() {
  this.authService.login({id: 1, username: this.username, role: this.role})
  console.log('Redirection vers :', this.role === 'formateur' ? '/dashboard-formateur' : '/profil-eleve');

 if(this.role === 'formateur'){
  this.router.navigate(['/dashboard-formateur']);
} else {
  this.router.navigate(['/profil-eleve']);
 }  
}  
}


