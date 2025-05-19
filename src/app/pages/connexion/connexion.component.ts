import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
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
  @Output() fermer = new EventEmitter<void>();

  username: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // On récupère la liste des utilisateurs stockés dans le navigateur.
    // Si elle n'existe pas encore, on utilise un tableau vide par défaut '[]'
    const utilisateurs = JSON.parse(
      localStorage.getItem('utilisateurs') || '[]'
    );

    // On cherche l'utilisateur dont le nom d'utilisateur correspond à celui saisi dans le champ "username"
    const user = utilisateurs.find((u: any) => u.username === this.username);

    // Si aucun utilisateur trouvé, on affiche un message et on arrête la connexion
    if (!user) {
      alert("Nom d'utilisateur introuvable !");
      return;
    }

    // Sinon, on stocke cet utilisateur comme "utilisateur actif" pour la session
    localStorage.setItem('utilisateurActif', JSON.stringify(user));

    // On redirige vers la bonne interface selon son rôle
    if (user.role === 'formateur') {
      this.router.navigate(['/dashboard-formateur']);
    } else {
      this.router.navigate(['/profil-eleve']);
    }
    this.fermer.emit();
  }
  annulerConnexion() {
  this.fermer.emit();
}

}
