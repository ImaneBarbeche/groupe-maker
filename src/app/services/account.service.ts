// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  
  getUtilisateurActif(): { username: string } | null {
  const userString = localStorage.getItem('utilisateurActif');
  if (!userString) return null;
  try {
    const user = JSON.parse(userString);
    return { username: user.username };
  } catch {
    return null;
  }
}


  getMonProfil(): Observable<Utilisateur> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Utilisateur>('http://localhost:8080/utilisateurs/me', {
      headers,
    });
  }

  updateMonProfil(utilisateur: Utilisateur): Observable<Utilisateur> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Utilisateur>(
      `http://localhost:8080/utilisateurs/${utilisateur.id}`,
      utilisateur,
      { headers }
    );
  }

  supprimerCompteEtReinitialiser(username: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`http://localhost:8080/utilisateurs/${username}`, {
      headers,
    });
  }
}
