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
  eleves: Eleve[];
  tirages: number;
  tirageValide?: boolean; 
  groupes?: { nom: string; eleves: Eleve[] }[];
  formateurUsername?: string; 

}
