import { Utilisateur } from "./utilisateur.interface";

export interface Formateur extends Utilisateur {
  speciality: string;
  role: 'formateur';
}
