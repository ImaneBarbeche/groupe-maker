import { Utilisateur } from "./utilisateur.interface";

export interface Eleve extends Utilisateur {
  language: number;
  techLevel: number;
  profil: string;
  dwwmStudent: boolean;
  cdaGroup: string;
  formateurUsername: string;
  groupe?: string; // nom du groupe actuel
  role: 'eleve'; // redéclaration obligatoire pour le type discriminant
}
