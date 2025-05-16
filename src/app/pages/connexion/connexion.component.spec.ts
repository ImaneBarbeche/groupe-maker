import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionComponent } from './connexion.component';
import { AuthserviceService } from '../../core/authservice.service';
import { Router } from '@angular/router';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

const mockAuthService = {
  login: jasmine.createSpy('login'),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionComponent],
      providers: [
  { provide: AuthserviceService, useValue: mockAuthService },
  { provide: Router, useValue: mockRouter }
]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method when form is submitted', () => {

  // Étape 1 : donner des valeurs au composant 
  component.username = 'Jean';
  component.role = 'formateur';
  
  
  // Étape 2 : appeler la méthode
  component.onSubmit();

  // Étape 3 : vérifier que login a été appelé avec l'utilisateur attendu
  expect(mockAuthService.login).toHaveBeenCalledWith({
  id: 1,
  username: 'Jean',
  role: 'formateur'
});
  // Étape 4 : vérifier que la redirection est correcte
  expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard-formateur']);
});
});