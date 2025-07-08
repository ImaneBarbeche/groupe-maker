// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/utilisateurs';

  // Méthode désactivée - endpoint /me supprimé du backend
  // getMonProfil(): Observable<Utilisateur> {
  //   return this.http.get<Utilisateur>(`${this.apiUrl}/me`, {
  //     withCredentials: true,
  //   });
  // }

  updateMonProfil(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(
      `${this.apiUrl}/${utilisateur.id}`,
      utilisateur,
      { withCredentials: true }
    );
  }

  supprimerCompteEtReinitialiser(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    withCredentials: true,
  });
}

  login(credentials: { email: string; motDePasse: string }) {
  console.log('Envoi des credentials :', credentials);
  return this.http.post<LoginResponse>(
    `${this.apiUrl}/login`,
    credentials,
    { 
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  );
}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
