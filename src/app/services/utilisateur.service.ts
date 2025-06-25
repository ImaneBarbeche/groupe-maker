// src/app/services/utilisateur.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:8080/utilisateurs';

  constructor(private http: HttpClient) {}

  /** 🔍 Liste de tous les utilisateurs */
  getTousLesUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl, {
      withCredentials: true,
    });
  }

  /** 🔍 Récupérer un utilisateur par ID */
  getUtilisateurParId(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  /** ✏️ Modifier un utilisateur */
  modifierUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${utilisateur.id}`, utilisateur, {
      withCredentials: true,
    });
  }

  /** 🗑️ Supprimer un utilisateur */
  supprimerUtilisateur(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
