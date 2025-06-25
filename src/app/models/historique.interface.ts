export interface HistoriqueTirages {
  date: string;
  listeNom: string;
  groupes: {
    nom: string;
    personnes: {
      id: string;
      prenom: string;
    }[];
  }[];
}
