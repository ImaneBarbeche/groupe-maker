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