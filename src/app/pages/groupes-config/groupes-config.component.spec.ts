import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesConfigComponent } from './groupes-config.component';

describe('GroupesConfigComponent', () => {
  let component: GroupesConfigComponent;
  let fixture: ComponentFixture<GroupesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupesConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
