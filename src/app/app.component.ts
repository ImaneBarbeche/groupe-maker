import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { Utilisateur } from './models/utilisateur.interface';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConnexionComponent, InscriptionComponent, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'groupe-maker';
  utilisateurActif: Utilisateur | null = null;
  afficherModaleConnexion = false;
  afficherModaleInscription = false;
  afficherCGU: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // Ne plus appeler getMonProfil automatiquement
    this.verifierAcceptationCGU();
  }

  onUtilisateurConnecte() {
    // L'utilisateur est maintenant connecté - nous pourrions stocker ses infos
    // Pour l'instant, on se contente d'un simple flag
    console.log("Utilisateur connecté avec succès");
  }

  fermerModale() {
    this.afficherModaleConnexion = false;
  }

  fermerModaleInscription() {
    this.afficherModaleInscription = false;
  }

  seDeconnecter() {
    this.accountService.logout().subscribe({
      next: () => {
        this.utilisateurActif = null;
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Échec de la déconnexion :', err);
      },
    });
  }
  verifierAcceptationCGU() {
    const cguData = JSON.parse(localStorage.getItem('cguAccepted') || 'null');
    const expirationDelay = 13 * 30 * 24 * 60 * 60 * 1000; // 13 mois

    if (!cguData || Date.now() - cguData.timestamp > expirationDelay) {
      this.afficherCGU = true;
    } else {
      this.afficherCGU = false;
    }
  }

  accepterCGU() {
    localStorage.setItem(
      'cguAccepted',
      JSON.stringify({
        timestamp: Date.now(),
      })
    );
    this.afficherCGU = false;
  }
}
