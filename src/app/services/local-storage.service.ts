import { Injectable } from '@angular/core';
import { Liste, Eleve } from '../models/utilisateur.interface';
import { HistoriqueTirages } from '../models/historique.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Utilisateur actif
  getUtilisateurActif(): any {
    return JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
  }
  getUtilisateurs(): any[] {
    return JSON.parse(localStorage.getItem('utilisateurs') || '[]');
  }

  setUtilisateurActif(user: any): void {
    localStorage.setItem('utilisateurActif', JSON.stringify(user));
  }

  removeUtilisateurActif(): void {
    localStorage.removeItem('utilisateurActif');
  }
  setUtilisateurs(utilisateurs: any[]): void {
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  }

  // Listes par utilisateur
  getListes(username: string): Liste[] {
    const key = `listes_${username}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  setListes(username: string, listes: Liste[]): void {
    const key = `listes_${username}`;
    localStorage.setItem(key, JSON.stringify(listes));
  }

  // Groupes
  getGroupes(): { nom: string; eleves: Eleve[] }[] {
    return JSON.parse(localStorage.getItem('groupes') || '[]');
  }

  setGroupes(groupes: { nom: string; eleves: Eleve[] }[]): void {
    localStorage.setItem('groupes', JSON.stringify(groupes));
  }

  removeGroupes(): void {
    localStorage.removeItem('groupes');
  }

  // Historique des tirages
  getHistorique(): HistoriqueTirages[] {
    return JSON.parse(localStorage.getItem('historiqueTirages') || '[]');
  }

  setHistorique(historique: HistoriqueTirages[]): void {
    localStorage.setItem('historiqueTirages', JSON.stringify(historique));
  }

  // CGU / Cookies
  getCguAccepted(): { timestamp: number } | null {
    return JSON.parse(localStorage.getItem('cguAccepted') || 'null');
  }

  setCguAccepted(): void {
    localStorage.setItem(
      'cguAccepted',
      JSON.stringify({ timestamp: Date.now() })
    );
  }

  supprimerUtilisateur(username: string): void {
  const utilisateurs = this.getUtilisateurs().filter(u => u.username !== username);
  this.setUtilisateurs(utilisateurs);

  // Supprimer aussi son statut "connecté" s’il est actif
  const actif = this.getUtilisateurActif();
  if (actif?.username === username) {
    localStorage.removeItem('utilisateurActif');
  }
}
deconnecterUtilisateur(): void {
  localStorage.removeItem('utilisateurActif');
}

}
