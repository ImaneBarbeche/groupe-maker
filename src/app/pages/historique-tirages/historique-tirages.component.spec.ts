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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
