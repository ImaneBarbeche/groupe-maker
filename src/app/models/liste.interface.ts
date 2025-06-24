import { Eleve } from "./eleve.interface";

export interface Liste {
  id: string;
  nom: string;
  eleves: Eleve[];
  tirages: number;
  tirageValide?: boolean; 
  groupes?: { nom: string; eleves: Eleve[] }[];
  formateurUsername?: string; 
}
