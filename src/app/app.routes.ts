
import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListesComponent } from './pages/listes/listes.component';
import { GroupesComponent } from './pages/groupes/groupes.component';
import { DashboardFormateurComponent } from './dashboard-formateur/dashboard-formateur.component';
import { ProfilEleveComponent } from './profil-eleve/profil-eleve.component';
import { ProjetsComponent } from './pages/projets/projets.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'listes', component: ListesComponent },
  { path: 'groupes', component: GroupesComponent },
  { path: 'dashboard-formateur', component: DashboardFormateurComponent },
  { path: 'profil-eleve', component: ProfilEleveComponent },
  { path: 'projets', component: ProjetsComponent },

  // bonus : redirection si URL inconnue
  { path: '**', redirectTo: '' }
];


