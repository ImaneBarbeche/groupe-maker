import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../models/eleve.interface';
import { Formateur } from '../models/formateur.interface';
import { LoginResponse } from '../models/login-response.interface';


@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:8080/utilisateurs';

  constructor(private http: HttpClient) {}

  /** 🧑‍🏫 Vue formateur/admin — Liste des utilisateurs */
  getTousLesUtilisateurs(): Observable<(Eleve | Formateur)[]> {
    return this.http.get<(Eleve | Formateur)[]>(this.baseUrl, {
      withCredentials: true,
    });
  }

  /** 🔍 Récupérer un utilisateur par ID (ex : fiche détail) */
  getUtilisateurParId(id: string): Observable<Eleve | Formateur> {
    return this.http.get<Eleve | Formateur>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  /** ✏️ Modifier un utilisateur (autre que soi) */
  modifierUtilisateur(utilisateur: Eleve | Formateur): Observable<any> {
    return this.http.put(`${this.baseUrl}/${utilisateur.id}`, utilisateur, {
      withCredentials: true,
    });
  }

  /** 🗑️ Supprimer un utilisateur (autre que soi) */
  supprimerUtilisateur(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

 login(credentials: { email: string; motDePasse: string }) {
  return this.http.post<LoginResponse>(
    'http://localhost:8080/api/auth/login',
    credentials,
    {
      withCredentials: true,
    }
  );
}

register(user: any): Observable<any> {
  return this.http.post('http://localhost:8080/utilisateurs/register', user, {
    withCredentials: true,
  });
}

}
