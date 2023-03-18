import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialServiceLocationComponent } from './social-service-location.component';

describe('SocialServiceLocationComponent', () => {
  let component: SocialServiceLocationComponent;
  let fixture: ComponentFixture<SocialServiceLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialServiceLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialServiceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
