import { Component, OnInit } from '@angular/core';
import { Eleve } from '../../models/utilisateur.interface';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../core/local-storage.service';

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

  constructor(private localStorageService: LocalStorageService) {}

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
}
