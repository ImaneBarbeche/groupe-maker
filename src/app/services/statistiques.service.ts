import { Injectable } from '@angular/core';
import { Eleve } from '../models/eleve.interface';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  /**
   * Calcule la moyenne d'âge des élèves.
   */
  calculerMoyenne(ages: number[]): number {
    const total = ages.reduce((acc, val) => acc + val, 0);
    return ages.length ? Math.round(total / ages.length) : 0;
  }

  /**
   * Calcule la répartition des niveaux techniques en pourcentages.
   */
  calculerStatsTech(eleves: Eleve[]): string {
    const counts = [0, 0, 0, 0]; // niveaux 1 à 4
    eleves.forEach((e) => counts[e.techLevel - 1]++);
    const total = eleves.length;
    return counts
      .map((c, i) => `${Math.round((c / total) * 100)}% Niv ${i + 1}`)
      .join(', ');
  }
}
