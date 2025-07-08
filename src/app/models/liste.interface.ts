import { Personne } from './personne.interface';
import { Utilisateur } from './utilisateur.interface';

export interface Liste {
  id: string;
  nom: string;
  description?: string; // Aligné avec le backend
  tirages?: number;
  tirageValide?: boolean;
  personnes?: Personne[];
  utilisateur?: Utilisateur;
  groupes?: {
    nom: string;
    personnes: Personne[];
  }[];
}
