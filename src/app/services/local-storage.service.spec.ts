import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve the active user', () => {
  const user = { username: 'Jean', role: 'formateur' };
  service.setUtilisateurActif(user);

  const result = service.getUtilisateurActif();
  expect(result).toEqual(user);
});

it('should save and get listes for a specific user', () => {
  const listes = [{ id: '1', nom: 'CDA-Java', eleves: [], tirages: 0 }];
  service.setListes('marie', listes);

  const result = service.getListes('marie');
  expect(result).toEqual(listes);
});


it('should remove groupes from localStorage', () => {
  const groupes = [{ nom: 'G1', eleves: [] }];
  service.setGroupes(groupes);

  service.removeGroupes();
  const result = service.getGroupes();
  expect(result).toEqual([]);
});

 it('should save and retrieve historique tirages', () => {
    const historique = [
      { date: '2025-05-01', listeNom: 'CDA', groupes: [] }
    ];
    service.setHistorique(historique);
    const result = service.getHistorique();
    expect(result).toEqual(historique);
  });

  it('should save and retrieve CGU acceptance', () => {
    service.setCguAccepted();
    const result = service.getCguAccepted();
    expect(result).toBeTruthy();
    expect(typeof result?.timestamp).toBe('number');
  });

});
