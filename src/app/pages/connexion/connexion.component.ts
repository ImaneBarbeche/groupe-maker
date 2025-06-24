import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

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

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService
  ) {}

  annulerConnexion() {
    this.fermer.emit(); // Ferme la modale sans se connecter
  }
  onSubmit() {
    const credentials = {
      email: this.email,
      motDePasse: this.motDePasse,
    };

    this.utilisateurService.login(credentials).subscribe({
      next: (utilisateur) => {
        console.log('✅ Données reçues après login :', utilisateur); // ← ajoute cette ligne !

        localStorage.setItem('utilisateurActif', JSON.stringify(utilisateur));

        if (utilisateur.role === 'formateur') {
          this.router.navigate(['/dashboard-formateur']);
        } else {
          this.router.navigate(['/profil-eleve']);
        }

        this.connecte.emit();
        this.fermer.emit();
      },
      error: () => {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      },
    });
  }
}
