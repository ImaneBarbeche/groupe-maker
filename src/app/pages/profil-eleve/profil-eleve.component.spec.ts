import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilEleveComponent } from './profil-eleve.component';
import { LocalStorageService } from '../../services/local-storage.service';

describe('ProfilEleveComponent', () => {
  let component: ProfilEleveComponent;
  let fixture: ComponentFixture<ProfilEleveComponent>;

  const mockLocalStorageService = {
    getUtilisateurActif: () => ({
      id: '123',
      username: 'paul',
      firstName: 'Paul',
      age: 30,
      gender: 'masculin',
      language: 2,
      techLevel: 2,
      profil: 'Réservé',
      dwwmStudent: true,
      cdaGroup: 'CDA-Java',
      formateurUsername: 'Marie',
      role: 'eleve',
    }),
    getGroupes: () => [
      {
        nom: 'Groupe 1',
        eleves: [{ id: '123', firstName: 'Paul' }]
      }
    ],
    setUtilisateurActif: jasmine.createSpy('setUtilisateurActif')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilEleveComponent],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user and find his group on init', () => {
    // ACT
    component.ngOnInit();

    // ASSERT
    expect(component.user.username).toBe('paul');
    expect(component.groupeNom).toBe('Groupe 1');
  });

  it('should save user modifications and exit edit mode', () => {
    // ARRANGE
    component.ngOnInit();
    component.modeEdition = true;

    // ACT
    component.enregistrerModifications();

    // ASSERT
    expect(mockLocalStorageService.setUtilisateurActif).toHaveBeenCalledWith(component.user);
    expect(component.modeEdition).toBeFalse();
  });
});
