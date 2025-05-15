import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ListesComponent } from './pages/listes/listes.component';
import { GroupesComponent } from './pages/groupes/groupes.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'listes', component: ListesComponent },
  { path: 'groupes', component: GroupesComponent },
  // bonus : redirection si URL inconnue
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
