import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../core/authservice.service';
import { Eleve } from '../models/utilisateur.interface';

@Component({
  selector: 'app-profil-eleve',
  standalone: true,
  imports: [],
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.css'],
})
export class ProfilEleveComponent implements OnInit {
  user!: Eleve;

 projets: { titre: string; statut: string; groupe: string }[] = []


  constructor(private authService: AuthserviceService) {
    this.user = JSON.parse(localStorage.getItem('utilisateurActif') || '{}');
  }

  ngOnInit() {
  this.user = JSON.parse(localStorage.getItem('utilisateurActif') || '{}');
  this.projets = this.user?.projets ?? [];
}
}
