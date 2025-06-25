// src/app/models/login-response.interface.ts
import { Utilisateur } from './utilisateur.interface';

export interface LoginResponse {
  token: string;
  utilisateur: Utilisateur;
}
