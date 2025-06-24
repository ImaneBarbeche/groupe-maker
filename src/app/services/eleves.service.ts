import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../models/eleve.interface';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  constructor(private http: HttpClient) {}

  getElevesParListe(idListe: number): Observable<Eleve[]> {
    return this.http.post<Eleve[]>('http://localhost:8080/personnes-par-liste', { idListe });
  }
}
