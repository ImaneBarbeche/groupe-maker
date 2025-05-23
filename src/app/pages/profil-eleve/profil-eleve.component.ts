import { Component, OnInit } from '@angular/core';
import { Eleve } from '../../models/utilisateur.interface';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-eleve',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.css'],
})
export class ProfilEleveComponent implements OnInit {
  user!: Eleve; // Données de l'élève actuellement connecté
  modeEdition: boolean = false; // État pour activer l'édition du profil

  // Groupes issus des tirages, utilisés pour trouver le groupe de l'élève
  groupes: { nom: string; eleves: { id: string; firstName: string }[] }[] = [];

  groupeNom: string | null = null; // Nom du groupe auquel l'élève appartient (si trouvé)

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  /**
   * Initialise les données de l'élève et détermine son groupe si applicable
   */
  ngOnInit() {
    this.user = this.localStorageService.getUtilisateurActif();
    this.groupes = this.localStorageService.getGroupes();

    const groupeTrouve = this.groupes.find((g) =>
      g.eleves.some((e) => e.id === this.user.id)
    );

    this.groupeNom = groupeTrouve?.nom || null;
  }

  /**
   * Enregistre les modifications de profil dans le localStorage
   */
  enregistrerModifications() {
    this.localStorageService.setUtilisateurActif(this.user);
    this.modeEdition = false;
  }

  /**
   * Supprime le compte de l'élève, vide la session, et recharge l'application
   */
  supprimerMonCompte() {
    this.localStorageService.supprimerUtilisateur(this.user.username);
    localStorage.removeItem('utilisateurActif');
    this.router.navigate(['/']).then(() => {
      location.reload(); // Recharge complet pour mettre à jour le header
    });
  }
}
