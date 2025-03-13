import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialServiceReportsComponent } from './social-service-reports.component';

describe('SocialServiceReportsComponent', () => {
  let component: SocialServiceReportsComponent;
  let fixture: ComponentFixture<SocialServiceReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialServiceReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialServiceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
