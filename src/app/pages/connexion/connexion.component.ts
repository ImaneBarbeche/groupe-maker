import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
  @Output() connecte = new EventEmitter<void>();
  @Output() fermer = new EventEmitter<void>();

  username = '';

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  onSubmit() {
    const utilisateurs = this.localStorageService.getUtilisateurs();
    const user = utilisateurs.find((u: any) => u.username === this.username);

    if (!user) {
      alert("Nom d'utilisateur introuvable !");
      return;
    }

    this.localStorageService.setUtilisateurActif(user);

    const route = user.role === 'formateur' ? '/dashboard-formateur' : '/profil-eleve';
    this.router.navigate([route]);

    this.connecte.emit();
    this.fermer.emit();
  }

  annulerConnexion() {
    this.fermer.emit();
  }
}
