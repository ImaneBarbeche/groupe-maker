import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// stocker un utilisateur connecté avec _currentUser;
// gérer l'état de connexion avec _userIsLoggedIn;
// se connecter avec un utilisateur donné avec la méthode login();
//  se déconnecter avec la méthode logout();
//  lire les infos sans les modifier avec getters isLoggedIn, currentUser et userRole.

export class AuthserviceService {

private _userIsLoggedIn: boolean = false;

private _currentUser: { id: number; username: string; role: string } | null = null;

 constructor() { }
 
login (utilisateur: { id: number; username: string; role: string }) {
  this._userIsLoggedIn = true;
  this._currentUser = utilisateur;
}

get isLoggedIn() {
  return this._userIsLoggedIn;
}

get currentUser() {
  return this._currentUser;
}

get userRole() {
  return this._currentUser?.role;
}

getToken(): string | null {
  return localStorage.getItem('jwt');
}


}
