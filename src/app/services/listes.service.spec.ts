import { TestBed } from '@angular/core/testing';
import { ListesService } from './listes.service';
import { Liste } from '../models/utilisateur.interface';

describe('ListesService', () => {
  let service: ListesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array by default', () => {
    const result = service.getListes();
    expect(result).toEqual([]);
  });

  it('should store and return the provided listes', () => {
    // ARRANGE
    const listes: Liste[] = [
      { id: '1', nom: 'CDA-Java', eleves: [], tirages: 0 },
      { id: '2', nom: 'CDA-PHP', eleves: [], tirages: 1 }
    ];

    // ACT
    service.setListes(listes);
    const result = service.getListes();

    // ASSERT
    expect(result).toEqual(listes);
    expect(result.length).toBe(2);
  });
});
