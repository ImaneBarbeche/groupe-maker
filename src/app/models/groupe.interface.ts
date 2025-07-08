export interface Personne {
  id: string;
  nom: string;
  prenom: string;
  genre: 'masculin' | 'feminin' | 'autre';
  dateNaissance: Date;
  niveauTechnique: string;
  ancienEtudiant: boolean;
  aisanceFrancais: boolean;
  profil: string;
}

export interface Groupe {
  id: string;
  nom: string;
  personnes: Personne[]; // Aligner avec le backend qui utilise des objets Personne
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
