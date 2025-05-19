import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConnexionComponent, InscriptionComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'groupe-maker';
  utilisateurActif: any = null;
  afficherModaleConnexion = false;
  afficherModaleInscription = false;

  ngOnInit() {
    const user = localStorage.getItem('utilisateurActif');
    if (user) {
      this.utilisateurActif = JSON.parse(user);
    }
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
}
