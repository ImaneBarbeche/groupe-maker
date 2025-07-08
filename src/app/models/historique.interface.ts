export interface HistoriqueTirages {
  date: string; // Correspond à `dateTirage` dans le backend
  listeNom: string;
  groupes: {
    nom: string;
    personnes: {
      id: string;
      nom: string; // Aligné avec le backend
    }[];
  }[];
}
