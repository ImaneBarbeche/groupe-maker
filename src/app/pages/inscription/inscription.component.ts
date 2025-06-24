import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Eleve } from '../../models/eleve.interface';
import { Formateur } from '../../models/formateur.interface';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  // ─── Événements vers le parent ───────────────────────────────
  @Output() connecte = new EventEmitter<void>();
  @Output() fermer = new EventEmitter<void>();

  // ─── Données du formulaire ───────────────────────────────────
  userRole: 'eleve' | 'formateur' | null = null;
  eleve!: Eleve;
  formateur!: Formateur;

  formateurs: Formateur[] = [];

  // ─── Listes déroulantes ──────────────────────────────────────
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

  // ─── État des sections (accordéons) ──────────────────────────
  sectionsOuvertes = {
    infosPerso: true,
    profilTech: false,
    formateur: false,
  };

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService
  ) {}

  // ─── Gestion des rôles ───────────────────────────────────────
  setRole(role: 'eleve' | 'formateur') {
    this.userRole = role;

    if (role === 'eleve') {
      this.eleve = {
        id: '',
        username: '',
        firstName: '',
        email: '', // 👈 nouveau
        motDePasse: '', // 👈 nouveau
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

      this.utilisateurService.getAll().subscribe((utilisateurs) => {
        this.formateurs = utilisateurs.filter((u) => u.role === 'formateur');
      });
    } else {
      this.formateur = {
        id: '',
        username: '',
        firstName: '',
        email: '', // 👈 nouveau
        motDePasse: '', // 👈 nouveau
        age: 0,
        gender: '',
        speciality: '',
        role: 'formateur',
      };
    }
  }

  // ─── Soumission du formulaire ────────────────────────────────
  onSubmit() {
    const user = this.userRole === 'eleve' ? this.eleve : this.formateur;

    // Étape 1 : vérifier si l'utilisateur existe déjà
    this.utilisateurService.getAll().subscribe((utilisateurs) => {
      const existe = utilisateurs.some((u) => u.username === user.username);
      if (existe) {
        alert("Ce nom d'utilisateur existe déjà !");
        return;
      }
      // Étape 2 : enregistrer l'utilisateur
      this.utilisateurService.register(user).subscribe(() => {
        // Simulation : stocker l’utilisateur connecté en local
        localStorage.setItem('utilisateurActif', JSON.stringify(user));

        // Redirection
        const redirection =
          this.userRole === 'eleve' ? '/profil-eleve' : '/dashboard-formateur';
        this.router.navigate([redirection]);

        this.connecte.emit();
        this.fermer.emit();
      });
    });
  }

  // ─── Gestion UI ──────────────────────────────────────────────
  annuler() {
    this.fermer.emit();
  }

  toggleSection(section: keyof typeof this.sectionsOuvertes) {
    this.sectionsOuvertes[section] = !this.sectionsOuvertes[section];
  }
}
