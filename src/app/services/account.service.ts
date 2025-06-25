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

  getMonProfil(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>('http://localhost:8080/utilisateurs/me', {
      withCredentials: true,
    });
  }

  updateMonProfil(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(
      `http://localhost:8080/utilisateurs/${utilisateur.id}`,
      utilisateur,
      { withCredentials: true }
    );
  }

  supprimerCompteEtReinitialiser(id: string): Observable<any> {
  return this.http.delete(`http://localhost:8080/utilisateurs/${id}`, {
    withCredentials: true,
  });
}

  login(credentials: { email: string; motDePasse: string }) {
    console.log('Envoi des credentials :', credentials); // ← ici aussi
    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/login',
      credentials,
      { withCredentials: true }
    );
  }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/utilisateurs/register', user, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      'http://localhost:8080/api/auth/logout',
      {},
      { withCredentials: true }
    );
  }
}
