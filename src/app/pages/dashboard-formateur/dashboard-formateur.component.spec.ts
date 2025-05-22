import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardFormateurComponent } from './dashboard-formateur.component';
import { ListesService } from '../../services/listes.service';

describe('DashboardFormateurComponent', () => {
  let component: DashboardFormateurComponent;
  let fixture: ComponentFixture<DashboardFormateurComponent>;

  const mockListesService = {
    getListes: () => [], // Valeur par défaut
  };

  beforeEach(async () => {
    localStorage.setItem(
      'utilisateurActif',
      JSON.stringify({
        id: '1',
        username: 'Marie',
        firstName: 'Marie',
        age: 35,
        gender: 'féminin',
        speciality: 'Angular',
        role: 'formateur',
      })
    );
    await TestBed.configureTestingModule({
      imports: [DashboardFormateurComponent],
      providers: [{ provide: ListesService, useValue: mockListesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load only the students of the active formateur and compute stats', () => {
    // ARRANGE
    const mockListes = [
      {
        id: '1',
        nom: 'CDA-1',
        eleves: [
          {
            id: '1',
            firstName: 'Luna',
            age: 20,
            techLevel: 2,
            formateurUsername: 'Marie',
          },
          {
            id: '2',
            firstName: 'Alex',
            age: 24,
            techLevel: 3,
            formateurUsername: 'Marie',
          },
          {
            id: '3',
            firstName: 'Zara',
            age: 30,
            techLevel: 4,
            formateurUsername: 'Autre',
          },
        ],
      },
    ];

    const listesService = TestBed.inject(ListesService) as any;
    spyOn(listesService, 'getListes').and.returnValue(mockListes);

    // ACT
    component.ngOnInit(); // recharge les données filtrées et les stats

    // ASSERT
    expect(component.mesEleves.length).toBe(2); // Luna et Alex
    expect(component.totalEleves).toBe(2);
    expect(component.moyenneAge).toBe(22); // (20 + 24) / 2
    expect(component.statsTechnique).toContain('50% Niv 2');
    expect(component.statsTechnique).toContain('50% Niv 3');
  });

  it('should handle case where no student is assigned to the formateur', () => {
    // ARRANGE
    const mockListes = [
      {
        id: '1',
        nom: 'CDA-1',
        eleves: [
          {
            id: '3',
            firstName: 'Zara',
            age: 30,
            techLevel: 4,
            formateurUsername: 'Autre',
          },
        ],
      },
    ];

    const listesService = TestBed.inject(ListesService) as any;
    spyOn(listesService, 'getListes').and.returnValue(mockListes);

    // ACT
    component.ngOnInit(); // recharge les données filtrées et les stats

    // ASSERT
    expect(component.mesEleves.length).toBe(0);
    expect(component.totalEleves).toBe(0);
    expect(component.moyenneAge).toBe(0);
  });
});
