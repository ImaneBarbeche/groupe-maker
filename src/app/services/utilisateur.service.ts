import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../models/eleve.interface';
import { Formateur } from '../models/formateur.interface';
import { Utilisateur } from '../models/utilisateur.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:8080/utilisateurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<(Eleve | Formateur)[]> {
    return this.http.get<(Eleve | Formateur)[]>(this.baseUrl);
  }

  register(user: Eleve | Formateur): Observable<Eleve | Formateur> {
    return this.http.post<Eleve | Formateur>(this.baseUrl + '/register', user);
  }

  login(credentials: { username: string; motDePasse: string }) {
    return this.http.post<any>(
      'http://localhost:8080/utilisateurs/login',
      credentials
    );
  }

  getMe(): Observable<Utilisateur> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>('http://localhost:8080/utilisateurs/me', {
      headers,
    });
  }
}
