import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListesComponent } from './listes.component';
import { LocalStorageService } from '../../services/local-storage.service'; 
import { Liste } from '../../models/liste.interface';
describe('ListesComponent', () => {
  let component: ListesComponent;
  let fixture: ComponentFixture<ListesComponent>;

  const mockLocalStorageService = {
    getUtilisateurActif: () => ({ username: 'Marie' }),
    getListes: (username: string): Liste[] => [
      { id: '1', nom: 'CDA-Java', eleves: [], tirages: 0 },
      { id: '2', nom: 'CDA-PHP', eleves: [], tirages: 1 }
    ],
    setListes: jasmine.createSpy('setListes')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesComponent],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lists from localStorage on init', () => {
    // ACT
    component.ngOnInit();

    // ASSERT
    expect(component.listes.length).toBe(2);
    expect(component.listes[0].nom).toBe('CDA-Java');
  });

  it('should remove a list by id and update the service', () => {
    // ARRANGE
    component.ngOnInit();
    const initialLength = component.listes.length;

    // ACT
    component.supprimerListe('1');

    // ASSERT
    expect(component.listes.length).toBe(initialLength - 1);
    expect(component.listes.find(l => l.id === '1')).toBeUndefined();
    expect(mockLocalStorageService.setListes).toHaveBeenCalledWith('Marie', jasmine.any(Array));
  });
});
