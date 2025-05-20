export interface Eleve {
  id: string;
  username: string;
  firstName: string;
  age: number;
  gender: string;
  language: number;
  techLevel: number;
  profil: string;
  dwwmStudent: boolean;
  cdaGroup: string;
  role: 'eleve';
  formateurUsername: string;
  groupe?: string; // le nom du groupe actuel
  projets?: { titre: string; statut: string; groupe: string }[];
}

export interface Formateur {
  id: string;
  username: string;
  firstName: string;
  age: number;
  gender: string;
  speciality: string;
  role: 'formateur';
}

export interface Liste {
  id: string;
  nom: string;
  eleves: Eleve[];    // chaque liste contient une liste d'élèves
  tirages: number;    // nombre de fois qu'on a généré des groupes
}