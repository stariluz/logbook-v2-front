import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStudentsGroupComponent } from './open-students-group.component';

describe('OpenStudentsGroupComponent', () => {
  let component: OpenStudentsGroupComponent;
  let fixture: ComponentFixture<OpenStudentsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenStudentsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenStudentsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
