export interface Utilisateur {
  id?: string;
  username: string;
  firstName: string;
  age: number;
  gender: string;
  email: string;
  motDePasse: string;
  role: 'eleve' | 'formateur';
}

