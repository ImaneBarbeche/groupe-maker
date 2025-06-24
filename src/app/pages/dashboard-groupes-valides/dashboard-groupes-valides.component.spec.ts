import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGroupesValidesComponent } from './dashboard-groupes-valides.component';

describe('DashboardGroupesValidesComponent', () => {
  let component: DashboardGroupesValidesComponent;
  let fixture: ComponentFixture<DashboardGroupesValidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGroupesValidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGroupesValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
