import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Eleve, Formateur } from '../../models/utilisateur.interface';

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

  eleve!: Eleve;
  formateur!: Formateur;

  userRole: 'eleve' | 'formateur' | null = null;
  formateurs: Formateur[] = [];

  constructor(private router: Router) {}

  setRole(role: 'eleve' | 'formateur') {
    this.userRole = role;

    if (role === 'eleve') {
      this.eleve = {
        id: '',
        username: '',
        firstName: '',
        age: 0,
        gender: '',
        language: 0,
        techLevel: 0,
        profil: '',
        dwwmStudent: false,
        cdaGroup: '',
        role: 'eleve',
        formateurUsername: '',
      };
        // 🔽 Charger la liste des formateurs
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs') || '[]');
    this.formateurs = utilisateurs.filter((u: any) => u.role === 'formateur');
    } else {
      this.formateur = {
        id: '',
        username: '',
        firstName: '',
        age: 0,
        gender: '',
        speciality: '',
        role: 'formateur',
      };
    }
  }

  onSubmit() {
    // On récupère les utilisateurs déjà inscrits (ou un tableau vide)
    const utilisateurs = JSON.parse(
      localStorage.getItem('utilisateurs') || '[]'
    );

    // On vérifie si le nom d'utilisateur est déjà utilisé
    const user = this.userRole === 'eleve' ? this.eleve : this.formateur;
    const existe = utilisateurs.some((u: any) => u.username === user.username);
    if (existe) {
      alert("Ce nom d'utilisateur existe déjà !");
      return;
    }

    user.id = crypto.randomUUID();

    // On ajoute le nouvel utilisateur au tableau
    utilisateurs.push(user);

    // Et on ré-enregistre le tableau complet dans le localStorage
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

    // Puis on enregistre cet utilisateur comme étant "actif"
    localStorage.setItem('utilisateurActif', JSON.stringify(user));
    if (this.userRole === 'eleve') {
      const key = `listes_${this.eleve.formateurUsername}`;
      const listes = JSON.parse(localStorage.getItem(key) || '[]');

      const nomListe = this.eleve.cdaGroup;
      let liste = listes.find((l: any) => l.nom === nomListe);

      if (!liste) {
        liste = {
          id: crypto.randomUUID(),
          nom: nomListe,
          eleves: [],
          tirages: 0,
        };
        listes.push(liste);
      }

      liste.eleves.push(this.eleve);
      localStorage.setItem(key, JSON.stringify(listes));
    }

    // Redirection selon le rôle
    if (this.userRole === 'eleve') {
      this.router.navigate(['/profil-eleve']);
    } else if (this.userRole === 'formateur') {
      this.router.navigate(['/dashboard-formateur']);
    }
    this.connecte.emit(); // pour mettre à jour le header
    this.fermer.emit(); // pour fermer la modale
  }

  // Méthode pour annuler l'inscription
  annuler() {
    this.fermer.emit(); // fermeture manuelle
  }
}
