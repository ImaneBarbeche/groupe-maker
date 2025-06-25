// src/app/services/statistiques.service.ts
import { Injectable } from '@angular/core';
import { Personne } from '../models/personne.interface';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  /**
   * Calcule la moyenne d'âge des personnes.
   */
  calculerMoyenne(ages: number[]): number {
    const total = ages.reduce((acc, val) => acc + val, 0);
    return ages.length ? Math.round(total / ages.length) : 0;
  }

  /**
   * Calcule la répartition des niveaux techniques en pourcentages.
   */
  calculerStatsTech(personnes: Personne[]): string {
    const counts = [0, 0, 0, 0]; // niveaux 1 à 4
    personnes.forEach((p) => counts[p.techLevel - 1]++);
    const total = personnes.length;
    return counts
      .map((c, i) => `${Math.round((c / total) * 100)}% Niv ${i + 1}`)
      .join(', ');
  }
}
