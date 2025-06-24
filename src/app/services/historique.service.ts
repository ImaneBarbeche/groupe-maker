import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriqueTirages } from '../models/historique.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  constructor(private http: HttpClient) {}

  getHistorique(): Observable<HistoriqueTirages[]> {
    return this.http.get<HistoriqueTirages[]>('http://localhost:8080/api/historique');
  }

  save(tirage: HistoriqueTirages): Observable<any> {
    return this.http.post('http://localhost:8080/api/historique', tirage);
  }

  saveAll(tirages: HistoriqueTirages[]): Observable<any> {
    return this.http.post('http://localhost:8080/api/historique/batch', tirages);
  }
}
