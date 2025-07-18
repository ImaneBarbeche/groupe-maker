import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListesComponent } from './pages/listes/listes.component';
import { GroupesComponent } from './pages/groupes/groupes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistoriqueTiragesComponent } from './pages/historique-tirages/historique-tirages.component';
import { CreateListComponent } from './pages/create-list/create-list.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'listes', component: ListesComponent },
  { path: 'groupes', component: GroupesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'historique', component: HistoriqueTiragesComponent },
  { path: 'create-list', component: CreateListComponent },

  // bonus : redirection si URL inconnue
  { path: '**', redirectTo: '' },
];
