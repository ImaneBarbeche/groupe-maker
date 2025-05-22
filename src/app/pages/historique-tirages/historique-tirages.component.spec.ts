import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriqueTiragesComponent } from './historique-tirages.component';

describe('HistoriqueTiragesComponent', () => {
  let component: HistoriqueTiragesComponent;
  let fixture: ComponentFixture<HistoriqueTiragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueTiragesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueTiragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load historique from localStorage if present', () => {
  // ARRANGE
  const historiqueMock = [
    { date: '2024-01-01', groupes: [{ nom: 'Groupe A', eleves: [] }] }
  ];
  localStorage.setItem('historiqueTirages', JSON.stringify(historiqueMock));

  // ACT
  component.ngOnInit();

  // ASSERT
  expect(component.historique.length).toBe(1);
  expect(component.historique[0].date).toBe('2024-01-01');
});
  it('should alert if historique is empty', () => {
    // ARRANGE
    spyOn(window, 'alert');
    localStorage.setItem('historiqueTirages', JSON.stringify([]));

    // ACT
    component.ngOnInit();

    // ASSERT
    expect(window.alert).toHaveBeenCalledWith('Aucun tirage n\'a été effectué.');
  });

});
