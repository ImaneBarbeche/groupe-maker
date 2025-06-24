import { Component, OnInit } from '@angular/core';
import { Eleve } from '../../models/eleve.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { GroupesService } from '../../services/groupes.service'; // à créer si nécessaire
import { CommonModule } from '@angular/common';

interface GroupeTirage {
  nom: string;
  eleves: { id: string; firstName: string }[];
}

@Component({
  selector: 'app-profil-eleve',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.css'],
})
export class ProfilEleveComponent implements OnInit {
  user!: Eleve;
  groupes: GroupeTirage[] = [];
  groupeNom: string | null = null;
  modeEdition = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private groupesService: GroupesService
  ) {}

  ngOnInit() {
    this.accountService.getMonProfil().subscribe((profil) => {
      if (profil.role === 'eleve') {
        this.user = profil as Eleve;

        this.groupesService
          .getGroupesAvecEleves()
          .subscribe((groupes: GroupeTirage[]) => {
            this.groupes = groupes;
            const groupeTrouve = groupes.find((g) =>
              g.eleves.some((e) => e.id === this.user.id)
            );
            this.groupeNom = groupeTrouve?.nom || null;
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  enregistrerModifications() {
    this.accountService.updateMonProfil(this.user).subscribe(() => {
      this.modeEdition = false;
    });
  }

  supprimerMonCompte() {
    this.accountService
      .supprimerCompteEtReinitialiser(this.user.username)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
