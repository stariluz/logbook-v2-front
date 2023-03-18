import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialServiceComponent } from './social-service.component';

describe('SocialServiceComponent', () => {
  let component: SocialServiceComponent;
  let fixture: ComponentFixture<SocialServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
