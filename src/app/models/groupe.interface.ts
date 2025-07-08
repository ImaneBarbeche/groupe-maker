export interface Groupe {
  id: string;
  nom: string;
  personnes: string[]; // IDs des personnes dans le groupe
}

export interface Tirage {
  id: string;
  nom: string;
  listeId: string;
  groupes: Groupe[];
  dateCreation: Date;
  criteresMixite: CriteresMixite;
  valide: boolean; // Une fois validé, ne peut plus être modifié
}

export interface CriteresMixite {
  mixerGenres: boolean;
  mixerAges: boolean;
  mixerNiveauxTechniques: boolean;
  mixerAnciensEtudiants: boolean;
  mixerAisanceFrancais: boolean;
  mixerProfils: boolean;
}
