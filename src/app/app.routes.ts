
import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListesComponent } from './pages/listes/listes.component';
import { GroupesComponent } from './pages/groupes/groupes.component';
import { DashboardFormateurComponent } from './pages/dashboard-formateur/dashboard-formateur.component';
import { ProfilEleveComponent } from './pages/profil-eleve/profil-eleve.component';
import { HistoriqueTiragesComponent } from './pages/historique-tirages/historique-tirages.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'listes', component: ListesComponent },
  { path: 'groupes', component: GroupesComponent },
  { path: 'dashboard-formateur', component: DashboardFormateurComponent },
  { path: 'profil-eleve', component: ProfilEleveComponent },
  { path: 'historique', component: HistoriqueTiragesComponent },

  // bonus : redirection si URL inconnue
  { path: '**', redirectTo: '' },
];


