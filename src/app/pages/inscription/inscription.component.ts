import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur.interface';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  @Output() connecte = new EventEmitter<void>();
  @Output() fermer = new EventEmitter<void>();

  utilisateur: Utilisateur = {
    id: '',
    prenom: '',
    nom: '',
    email: '',
    motDePasse: '',
  };

  constructor(private router: Router, private accountService: AccountService) {}

  onSubmit() {
  console.log("Inscription envoyée :", this.utilisateur);

  this.accountService.register(this.utilisateur).subscribe({
    next: () => {
      // ✅ Attendre un peu avant d'appeler /me
      setTimeout(() => {
        this.accountService.getMonProfil().subscribe({
          next: (user) => {
            localStorage.setItem('utilisateurActif', JSON.stringify(user));
            this.router.navigate(['/dashboard']); // ← redirection profil
            this.connecte.emit();
            this.fermer.emit();
          },
          error: (err) => {
            console.error('❌ Erreur getMonProfil après inscription', err);
          },
        });
      }, 100); // attendre 100ms suffit en général
    },
    error: (err) => {
      console.error('Erreur inscription :', err);
      alert("L'inscription a échoué.");
    },
  });
}


  annuler() {
    this.fermer.emit();
  }
}
