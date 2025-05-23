import { TestBed } from '@angular/core/testing';

import { AuthserviceService } from './authservice.service';

describe('AuthserviceService', () => {
  let service: AuthserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in by default', () => {
    expect(service.isLoggedIn).toBeFalse();
    expect(service.currentUser).toBeNull();
    expect(service.userRole).toBeUndefined();
  });
  
  it('should return the correct role after login', () => {
    const utilisateurTest = {
      id: 1,
      username: 'Jean',
      role: 'formateur'

    }

    service.login(utilisateurTest);
    expect(service.userRole).toEqual('formateur');

})

it('should return false after logout', () => {
  service.logout();
  expect(service.isLoggedIn).toBe(false);
});

it('should return true after login', () => {
  const utilisateurTest = {
    id: 1,
    username: 'Jean',
    role: 'formateur'
  }
  service.login(utilisateurTest);
  expect(service.isLoggedIn).toBe(true);
});
});
