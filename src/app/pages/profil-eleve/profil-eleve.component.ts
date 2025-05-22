import { Component, OnInit } from '@angular/core';
import { Eleve } from '../../models/utilisateur.interface';
import { FormsModule } from '@angular/forms';

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

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('utilisateurActif') || '{}');
    this.groupes = JSON.parse(localStorage.getItem('groupes') || '[]');

    const groupeTrouve = this.groupes.find((g) =>
      g.eleves.some((e) => e.id === this.user.id)
    );

    this.groupeNom = groupeTrouve?.nom || null;
  }

  enregistrerModifications() {
    localStorage.setItem('utilisateurActif', JSON.stringify(this.user));
    this.modeEdition = false;
  }
}
