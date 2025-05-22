import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { Router } from '@angular/router';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  }; //crées un espion sur la méthode navigate qui enregistre chaque appel avec les arguments et te permet de dire : “Cette méthode a-t-elle été appelée avec telle valeur ?”

  beforeEach(async () => {
    localStorage.clear(); // On vide le localStorage avant chaque test pour éviter les interférences entre les tests.
    await TestBed.configureTestingModule({
      imports: [ConnexionComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should find the user and redirect to dashboard-formateur', () => {
    const testUser = {
      username: 'Jean',
      role: 'formateur',
    };

    // Stocke un tableau contenant cet utilisateur
    localStorage.setItem('utilisateurs', JSON.stringify([testUser]));

    component.username = 'Jean'; // l'utilisateur entré dans le formulaire

    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard-formateur']);
  });

  it('should find the user and redirect to profil-eleve', () => {
    const testUser = {
      username: 'Marie',
      role: 'eleve',
    };
    // Stocke un tableau contenant cet utilisateur
    localStorage.setItem('utilisateurs', JSON.stringify([testUser]));
    component.username = 'Marie'; // l'utilisateur entré dans le formulaire
    component.onSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profil-eleve']);
  });

  // On veut vérifier ce qui se passe si une personne entre un username qui n’existe pas dans la base (localStorage).
  // Exemple : si personne ne s’est inscrit sous le nom Jacques, on ne doit pas pouvoir se connecter avec ce nom.

  it('should not find the user and show alert', () => {
    spyOn(window, 'alert'); // ← on espionne alert()
    mockRouter.navigate.calls.reset(); // On réinitialise les appels de navigate() pour vérifier si elle a été appelée ou non.
    // On prépare un faux environnement sans utilisateurs, on vide la "liste des inscrits" pour dire : personne n’est encore enregistré.
    localStorage.setItem('utilisateurs', JSON.stringify([]));
    component.username = 'Jacques';  // On simule un nom d’utilisateur dans le champ

    component.onSubmit(); // On lance la fonction de connexion

    expect(mockRouter.navigate).not.toHaveBeenCalled(); // Parce que la connexion doit échouer : donc pas de navigate().
    expect(localStorage.getItem('utilisateurActif')).toBeNull();
    expect(window.alert).toHaveBeenCalledWith("Nom d'utilisateur introuvable !"); // Angular appelle alert(...) pour prévenir l’utilisateur.
  });

  /**
   * Cleans up the local storage after each test case.
   * This function is called after each test case to ensure that the local storage is cleared,
   * preventing any side effects from one test case to another.
   *
   * @returns {void} This function does not return any value.
   */
  afterEach(() => {
    localStorage.clear();
  });
});
