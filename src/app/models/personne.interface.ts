export interface Personne {
  id: string;
  nom: string; // 3-50 caractères, not null
  genre: 'masculin' | 'féminin' | 'ne se prononce pas'; // String, liste déroulante, not null
  aisanceFr: number; // 1-4, not null (aligné avec le backend)
  ancienDWWM: boolean; // Boolean, not null
  niveauTechnique: number; // 1-4, not null
  profil: 'timide' | 'réservé' | 'à l\'aise'; // String, liste déroulante, not null
  age: number; // 0-100, not null
  groupe?: string; // nom du groupe actuel (optionnel)
}
