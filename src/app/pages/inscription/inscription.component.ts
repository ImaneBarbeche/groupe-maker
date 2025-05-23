import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Eleve, Formateur } from '../../models/utilisateur.interface';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  @Output() connecte = new EventEmitter<void>(); // pour informer le header
  @Output() fermer = new EventEmitter<void>(); // pour fermer la modale

  // Valeurs des champs select
  genders = ['Féminin', 'Masculin', 'Ne préfère pas répondre'];
  languages = ['0 - Ne parle pas français', '1 - Faible', '2 - Moyen', '3 - Bon', '4 - Excellent'];
  profiles = ['Timide', 'Réservé', "A l'aise", 'Leader'];
  techLevels = ["0 - N'a jamais codé", '1 - Débutant', '2 - Intermédiaire', '3 - Avancé'];

  eleve!: Eleve;
  formateur!: Formateur;
  userRole: 'eleve' | 'formateur' | null = null;
  formateurs: Formateur[] = [];

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  /**
   * Initialise les champs de formulaire selon le rôle choisi
   */
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

      // Récupère la liste des formateurs existants pour les associer
      const utilisateurs = this.localStorageService.getUtilisateurs();
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

  /**
   * Valide le formulaire d’inscription et enregistre l’utilisateur
   */
  onSubmit() {
    const utilisateurs = this.localStorageService.getUtilisateurs();

    const user = this.userRole === 'eleve' ? this.eleve : this.formateur;

    const existe = utilisateurs.some((u: any) => u.username === user.username);
    if (existe) {
      alert("Ce nom d'utilisateur existe déjà !");
      return;
    }

    user.id = crypto.randomUUID(); // attribue un id unique
    utilisateurs.push(user);
    this.localStorageService.setUtilisateurs(utilisateurs);
    this.localStorageService.setUtilisateurActif(user);

    // Si l'utilisateur est un élève, l'ajouter à la bonne liste
    if (this.userRole === 'eleve') {
      const key = `listes_${this.eleve.formateurUsername}`;
      const listes = this.localStorageService.getListes(this.eleve.formateurUsername);
      const nomListe = this.eleve.cdaGroup;
      let liste = listes.find((l: any) => l.nom === nomListe);

      if (!liste) {
        liste = {
          id: crypto.randomUUID(),
          nom: nomListe,
          eleves: [],
          tirages: 0,
          groupes: [],
          tirageValide: false,
          formateurUsername: this.eleve.formateurUsername
        };
        listes.push(liste);
      }

      liste.eleves.push(this.eleve);
      this.localStorageService.setListes(this.eleve.formateurUsername, listes);
    }

    // Redirection après inscription
    if (this.userRole === 'eleve') {
      this.router.navigate(['/profil-eleve']);
    } else {
      this.router.navigate(['/dashboard-formateur']);
    }

    this.connecte.emit(); // met à jour le header
    this.fermer.emit(); // ferme la modale
  }

  // Ferme manuellement la modale
  annuler() {
    this.fermer.emit();
  }

  // Gestion du repli / dépli des sections de formulaire
  sectionsOuvertes = {
    infosPerso: true,
    profilTech: false,
    formateur: false,
  };

  toggleSection(section: keyof typeof this.sectionsOuvertes) {
    this.sectionsOuvertes[section] = !this.sectionsOuvertes[section];
  }
}
