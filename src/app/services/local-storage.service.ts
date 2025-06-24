import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // ✅ Gestion utilisateur actif (token ou données minimales)
 getUtilisateurActif(): { username: string } | null {
  return JSON.parse(localStorage.getItem('utilisateurActif') || 'null');
}


  setUtilisateurActif(user: any): void {
    localStorage.setItem('utilisateurActif', JSON.stringify(user));
  }

  removeUtilisateurActif(): void {
    localStorage.removeItem('utilisateurActif');
  }

  deconnecterUtilisateur(): void {
    localStorage.removeItem('utilisateurActif');
  }

  // ✅ CGU acceptées (stockage local uniquement)
  getCguAccepted(): { timestamp: number } | null {
    return JSON.parse(localStorage.getItem('cguAccepted') || 'null');
  }

  setCguAccepted(): void {
    localStorage.setItem(
      'cguAccepted',
      JSON.stringify({ timestamp: Date.now() })
    );
  }
}
