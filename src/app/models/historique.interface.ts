export interface HistoriqueTirages {
  date: string;
  listeNom: string;
  groupes: {
    nom: string;
    personnes: {
      id: string;
      nom: string; // Changé de "prenom" à "nom"
    }[];
  }[];
}
