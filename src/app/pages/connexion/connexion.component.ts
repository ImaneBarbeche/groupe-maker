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
@Output() connecte = new EventEmitter<void>(); // Émet un événement quand l'utilisateur est connecté
@Output() fermer = new EventEmitter<void>(); // Émet un événement pour fermer la modale
username = ''; // Nom d'utilisateur saisi dans le formulaire


  constructor(private router: Router, private localStorageService: LocalStorageService) {}

 onSubmit() {
  const utilisateurs = this.localStorageService.getUtilisateurs(); // Récupération de tous les utilisateurs
  const user = utilisateurs.find((u: any) => u.username === this.username); // Recherche de l'utilisateur saisi

  if (!user) {
    alert("Nom d'utilisateur introuvable !");
    return; // Stoppe l'exécution si aucun utilisateur trouvé
  }

  this.localStorageService.setUtilisateurActif(user); // Sauvegarde l'utilisateur actif dans le localStorage

  const route = user.role === 'formateur' ? '/dashboard-formateur' : '/profil-eleve'; // Redirection selon le rôle
  this.router.navigate([route]); // Redirection Angular

  this.connecte.emit(); // Met à jour l'état de connexion dans le parent
  this.fermer.emit(); // Ferme la modale
}


 annulerConnexion() {
  this.fermer.emit(); // Ferme la modale sans se connecter
}
}
