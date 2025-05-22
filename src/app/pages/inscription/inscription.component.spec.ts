import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { InscriptionComponent } from './inscription.component';
import { LocalStorageService } from '../../core/local-storage.service';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  const mockLocalStorageService = {
    getUtilisateurs: () =>
      JSON.parse(localStorage.getItem('utilisateurs') || '[]'),
    setUtilisateurs: (utilisateurs: any[]) =>
      localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs)),
    setUtilisateurActif: (user: any) =>
      localStorage.setItem('utilisateurActif', JSON.stringify(user)),
    getListes: (username: string) =>
      JSON.parse(localStorage.getItem(`listes_${username}`) || '[]'),
    setListes: (username: string, listes: any[]) =>
      localStorage.setItem(`listes_${username}`, JSON.stringify(listes)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent inscription if username already exists', () => {
    spyOn(window, 'alert');

    // ARRANGE – créer un formateur déjà inscrit dans le localStorage
    const existingUser = {
      id: '1',
      username: 'Jean',
      firstName: 'Jean',
      age: 30,
      gender: 'masculin',
      language: 2,
      techLevel: 2,
      profil: 'Réservé',
      dwwmStudent: true,
      cdaGroup: 'CDA-1',
      formateurUsername: 'ProfX',
      role: 'eleve' as 'eleve',
    };
    localStorage.setItem('utilisateurs', JSON.stringify([existingUser]));

    // Préparer le composant avec le même nom d'utilisateur
    component.setRole('eleve');
    component.userRole = 'eleve';
    component.eleve = { ...existingUser };

    // ACT
    component.onSubmit();

    // ASSERT
    expect(window.alert).toHaveBeenCalledWith(
      "Ce nom d'utilisateur existe déjà !"
    );
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to dashboard if inscription succeed', () => {
    spyOn(window, 'alert');

    //Arrange
    component.setRole('formateur'); // initialise component.formateur
    component.userRole = 'formateur';
    component.formateur.username = 'Marie';
    component.formateur.firstName = 'Marie';
    component.formateur.age = 32;
    component.formateur.gender = 'féminin';
    component.formateur.speciality = 'Angular';

    //Act
    component.onSubmit();

    //Assert
    const savedUsers = JSON.parse(localStorage.getItem('utilisateurs') || '[]');
    expect(savedUsers.some((u: any) => u.username === 'Marie')).toBeTrue();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard-formateur']);
    const activeUser = JSON.parse(
      localStorage.getItem('utilisateurActif') || '{}'
    );
    expect(activeUser.username).toBe('Marie');
  });

  it('should navigate to profil if inscription succeed for eleve', () => {
    spyOn(window, 'alert');

    //Arrange
    component.setRole('eleve');
    component.userRole = 'eleve';
    component.eleve.username = 'Paul';
    component.eleve.firstName = 'Paul';
    component.eleve.age = 32;
    component.eleve.gender = 'masculin';
    component.eleve.language = 3;
    component.eleve.techLevel = 2;
    component.eleve.profil = 'à l’aise';
    component.eleve.dwwmStudent = true;
    component.eleve.cdaGroup = 'CDA-1'; // important pour liste
    component.eleve.formateurUsername = 'Marie'; // important pour association

    //Act
    component.onSubmit();

    //Assert
    const savedUsers = JSON.parse(localStorage.getItem('utilisateurs') || '[]');
    expect(savedUsers.some((u: any) => u.username === 'Paul')).toBeTrue();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profil-eleve']);
    const activeUser = JSON.parse(
      localStorage.getItem('utilisateurActif') || '{}'
    );
    expect(activeUser.username).toBe('Paul');
  });
  afterEach(() => {
    localStorage.clear();
  });
});
