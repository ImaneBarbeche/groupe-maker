export interface GroupeTirage {
  nom: string;
  personnes: { id: string; nom: string }[]; // Changé de "prenom" à "nom"
}
