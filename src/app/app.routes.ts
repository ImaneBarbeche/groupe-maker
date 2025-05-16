
import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ListesComponent } from './pages/listes/listes.component';
import { GroupesComponent } from './pages/groupes/groupes.component';
import { DashboardFormateurComponent } from './dashboard-formateur/dashboard-formateur.component';
import { ProfilEleveComponent } from './profil-eleve/profil-eleve.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'listes', component: ListesComponent },
  { path: 'groupes', component: GroupesComponent },
  { path: 'dashboard-formateur', component: DashboardFormateurComponent },
  { path: 'profil-eleve', component: ProfilEleveComponent },
  // bonus : redirection si URL inconnue
  { path: '**', redirectTo: '' }
];


export class AppRoutingModule {}
