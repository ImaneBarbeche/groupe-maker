import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { InscriptionComponent } from './inscription.component';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent inscription if username already exist', () => {
    spyOn(window, 'alert');
    const testUser = {
      username: 'Jean',
      userRole: 'eleve',
    };
    localStorage.setItem('utilisateurs', JSON.stringify([testUser]));
    component.user.username = 'Jean';
    component.userRole = 'eleve';
    component.onSubmit();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "Ce nom d'utilisateur existe déjà !"
    );
  });

  it('should navigate to dashboard if inscription succeed', () => {
    spyOn(window, 'alert');
    component.userRole = 'formateur';
    component.user = {
      username: 'Marie',
      firstName: 'Marie',
      age: 32,
      gender: 'féminin',
      language: '3 - Bon',
      techLevel: '2 - Intermédiaire',
      profil: 'à l’aise',
      dwwmStudent: false,
      speciality: 'Angular',
    };
    component.onSubmit();
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
    component.userRole = 'eleve';
    component.user = {
      username: 'Paul',
      firstName: 'Paul',
      age: 32,
      gender: 'masculin',
      language: '3 - Bon',
      techLevel: '2 - Intermédiaire',
      profil: 'à l’aise',
      dwwmStudent: true,
    };
    component.onSubmit();
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
