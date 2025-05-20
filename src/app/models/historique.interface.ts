export interface HistoriqueTirages {
  date: string;
  listeNom: string;
  groupes: {
    nom: string;
    eleves: { id: string; firstName: string }[];
  }[];
}
