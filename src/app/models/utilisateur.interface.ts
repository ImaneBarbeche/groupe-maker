export interface Utilisateur {
  id: string;
  nom: string; // Nom de famille
  prenom: string; // Prénom
  email: string;
  motDePasse?: string; // Optionnel pour la sécurité côté client
}

