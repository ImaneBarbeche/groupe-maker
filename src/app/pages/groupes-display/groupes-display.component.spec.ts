import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesDisplayComponent } from './groupes-display.component';

describe('GroupesDisplayComponent', () => {
  let component: GroupesDisplayComponent;
  let fixture: ComponentFixture<GroupesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupesDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
