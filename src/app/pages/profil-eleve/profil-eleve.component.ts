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
  user!: Eleve;
  modeEdition: boolean = false;
  groupes: { nom: string; eleves: { id: string; firstName: string }[] }[] = [];
  groupeNom: string | null = null;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.localStorageService.getUtilisateurActif();
    this.groupes = this.localStorageService.getGroupes();

    const groupeTrouve = this.groupes.find((g) =>
      g.eleves.some((e) => e.id === this.user.id)
    );

    this.groupeNom = groupeTrouve?.nom || null;
  }

  enregistrerModifications() {
    this.localStorageService.setUtilisateurActif(this.user);
    this.modeEdition = false;
  }

  supprimerMonCompte() {
    this.localStorageService.supprimerUtilisateur(this.user.username);
    localStorage.removeItem('utilisateurActif');
    this.router.navigate(['/']).then(() => {
      location.reload(); // force un "vrai" rechargement visuel du header
    });
  }
}
