import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header2025Component } from './header-2025.component';

describe('Header2025Component', () => {
  let component: Header2025Component;
  let fixture: ComponentFixture<Header2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Header2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
