import { Injectable } from '@angular/core';
import { Liste } from '../models/utilisateur.interface';

@Injectable({
  providedIn: 'root'
})
export class ListesService {
  private listes: Liste[] = [];

  getListes(): Liste[] {
    return this.listes;
  }

  setListes(nouvellesListes: Liste[]): void {
    this.listes = nouvellesListes;
  }
}
