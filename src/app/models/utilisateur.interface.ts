export interface Utilisateur {
  id?: string;
  username: string;
  prenom: string;
  nom: string;
  age: number;
  gender: string;
  email: string;
  motDePasse: string;
  role: 'eleve' | 'formateur';
}

