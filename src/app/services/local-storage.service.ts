import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
 
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
