import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { LoginResponse } from '../../models/login-response.interface';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
  @Output() connecte = new EventEmitter<void>(); // Émet un événement quand l'utilisateur est connecté
  @Output() fermer = new EventEmitter<void>(); // Émet un événement pour fermer la modale
  email = ''; // Nom d'utilisateur saisi dans le formulaire
  motDePasse = '';

  constructor(private router: Router, private accountService: AccountService) {}

  annulerConnexion() {
    this.fermer.emit(); // Ferme la modale sans se connecter
  }
  onSubmit() {
    const credentials = {
      email: this.email,
      motDePasse: this.motDePasse,
    };

    this.accountService.login(credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('✅ Données reçues après login :', response);

        const utilisateur = response.utilisateur;
        localStorage.setItem('utilisateurActif', JSON.stringify(utilisateur));

        this.router.navigate(['/dashboard']);
        this.connecte.emit();
        this.fermer.emit();
      },
      error: (error) => {
        if (error.status === 401) {
          alert("Nom d'utilisateur ou mot de passe incorrect.");
        } else {
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
        console.error('❌ Erreur lors de la connexion :', error);
      },
    });
  }
}
