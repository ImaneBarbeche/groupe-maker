import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConnexionComponent, InscriptionComponent, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'groupe-maker';
  utilisateurActif: any = null;
  afficherModaleConnexion = false;
  afficherModaleInscription = false;

  afficherCGU: boolean = false;


  ngOnInit() {
    const user = localStorage.getItem('utilisateurActif');
    if (user) {
      this.utilisateurActif = JSON.parse(user);
    }
    this.verifierAcceptationCGU();
  }
  fermerModale() {
    this.afficherModaleConnexion = false;
  }
  fermerModaleInscription() {
  this.afficherModaleInscription = false;
}
  seDeconnecter() {
    localStorage.removeItem('utilisateurActif');
    this.utilisateurActif = null;
    window.location.href = '/'; // ou this.router.navigate(['/']);
  }
  onUtilisateurConnecte() {
  const user = localStorage.getItem('utilisateurActif');
  if (user) {
    this.utilisateurActif = JSON.parse(user);
  }
}

verifierAcceptationCGU() {
  const cguData = JSON.parse(localStorage.getItem('cguAccepted') || 'null');

  if (!cguData || Date.now() - cguData.timestamp > 13 * 30 * 24 * 60 * 60 * 1000) {
    this.afficherCGU = true;
  } else {
    this.afficherCGU = false;
  }
}

accepterCGU() {
  localStorage.setItem('cguAccepted', JSON.stringify({
    timestamp: Date.now()
  }));
  this.afficherCGU = false;
}


}
