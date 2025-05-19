import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  @Output() fermer = new EventEmitter<void>();
   annuler() {
  this.fermer.emit(); // fermeture manuelle
}
  genders = ['Féminin', 'Masculin', 'Ne préfère pas répondre'];
  languages = [
    '0 - Ne parle pas français',
    '1 - Faible',
    '2 - Moyen',
    '3 - Bon',
    '4 - Excellent',
  ];
  profiles = ['Timide', 'Réservé', "A l'aise", 'Leader'];
  techLevels = [
    "0 - N'a jamais codé",
    '1 - Débutant',
    '2 - Intermédiaire',
    '3 - Avancé',
  ];

  userRole: 'eleve' | 'formateur' | null = null;

  user: any = {
    username: '',
    firstName: '',
    age: null,
    gender: '',
    language: '',
    techLevel: '',
    profil: '',
    dwwmStudent: false,
    speciality: '',
  };

  constructor(private router: Router) {}

  setRole(role: 'eleve' | 'formateur') {
    this.userRole = role;
    this.user = { ...this.user, role }; // si tu veux ajouter le rôle dans le user lui-même
  }

  onSubmit() {
    // On récupère les utilisateurs déjà inscrits (ou un tableau vide)
    const utilisateurs = JSON.parse(
      localStorage.getItem('utilisateurs') || '[]'
    );

    // On vérifie si le nom d'utilisateur est déjà utilisé
    const existe = utilisateurs.some(
      (u: any) => u.username === this.user.username
    );
    if (existe) {
      alert("Ce nom d'utilisateur existe déjà !");
      return;
    }
    this.user.role = this.userRole;

    // On ajoute le nouvel utilisateur au tableau
    utilisateurs.push(this.user);

    // Et on ré-enregistre le tableau complet dans le localStorage
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

    // Puis on enregistre cet utilisateur comme étant "actif"
    localStorage.setItem('utilisateurActif', JSON.stringify(this.user));

    // Redirection selon le rôle
    if (this.userRole === 'eleve') {
      this.router.navigate(['/profil-eleve']);
    } else if (this.userRole === 'formateur') {
      this.router.navigate(['/dashboard-formateur']);
    }
  }
 
}
