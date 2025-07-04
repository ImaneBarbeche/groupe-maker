import { Injectable } from '@angular/core';
import { Liste } from '../models/liste.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListesService {
  constructor(private http: HttpClient) {}

getListes(): Observable<Liste[]> {
  return this.http.get<Liste[]>('http://localhost:8080/listes/mine', {
    withCredentials: true
  });
}

updateListe(liste: Liste): Observable<Liste> {
  return this.http.put<Liste>(`http://localhost:8080/listes/${liste.id}`, liste);
}

deleteListe(id: string): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/listes/${id}`);
}

}
