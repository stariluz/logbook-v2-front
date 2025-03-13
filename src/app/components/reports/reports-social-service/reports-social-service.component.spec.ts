import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSocialServiceComponent } from './reports-social-service.component';

describe('ReportsSocialServiceComponent', () => {
  let component: ReportsSocialServiceComponent;
  let fixture: ComponentFixture<ReportsSocialServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsSocialServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsSocialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
