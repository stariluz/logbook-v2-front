import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTeachersComponent } from './reports-teachers.component';

describe('ReportsTeachersComponent', () => {
  let component: ReportsTeachersComponent;
  let fixture: ComponentFixture<ReportsTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
