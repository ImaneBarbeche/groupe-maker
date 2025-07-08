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
      next: (response) => {
        console.log("✅ Inscription réussie :", response);
        
        // Afficher un message de succès à l'utilisateur
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        
        // Fermer le modal d'inscription
        this.fermer.emit();
      },
      error: (err) => {
        console.error('❌ Erreur inscription :', err);
        alert("L'inscription a échoué. Vérifiez vos données et réessayez.");
      },
    });
  }


  annuler() {
    this.fermer.emit();
  }
}
