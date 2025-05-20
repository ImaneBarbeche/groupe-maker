import { Component, OnInit } from '@angular/core';
import { ListesService } from '../services/listes.service';
import { Eleve } from '../models/utilisateur.interface';


@Component({
  selector: 'app-dashboard-formateur',
  standalone: true,
  templateUrl: './dashboard-formateur.component.html',
  styleUrls: ['./dashboard-formateur.component.css'],
})
export class DashboardFormateurComponent implements OnInit {
  // Données de l’utilisateur actif
utilisateurActif: any = JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
mesEleves: Eleve[] = [];

totalEleves: number = 0;
moyenneAge: number = 0;
statsTechnique: string = '';

totalGroupes: number = 0;
criteres: string = '';
dernierTirage: string = '';

totalProjets: number = 0;
projetsAssignes: number = 0;
projetsEnAttente: number = 0;

ngOnInit() {
  const toutesLesListes = this.listesService.getListes();

  // On extrait les élèves liés à ce formateur
  const tousLesEleves = toutesLesListes.flatMap(liste => liste.eleves || []);
  this.mesEleves = tousLesEleves.filter(eleve =>
    eleve.formateurUsername === this.utilisateurActif?.username
  );

  // Statistiques dynamiques
  this.totalEleves = this.mesEleves.length;
  this.moyenneAge = this.calculerMoyenne(this.mesEleves.map(e => e.age));
  this.statsTechnique = this.calculerStatsTech(this.mesEleves);
};

calculerMoyenne(ages: number[]): number {
  const total = ages.reduce((acc, val) => acc + val, 0);
  return ages.length ? Math.round(total / ages.length) : 0;
}

calculerStatsTech(eleves: Eleve[]): string {
  const counts = [0, 0, 0, 0]; // niveaux 1 à 4
  eleves.forEach(e => counts[e.techLevel - 1]++);
  const total = eleves.length;
  return counts.map((c, i) => `${Math.round((c / total) * 100)}% Niv ${i + 1}`).join(', ');
}



  constructor(private listesService: ListesService) {}

}
