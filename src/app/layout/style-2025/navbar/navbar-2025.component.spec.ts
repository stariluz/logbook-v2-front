import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar2025Component } from './navbar-2025.component';

describe('Navbar2025Component', () => {
  let component: Navbar2025Component;
  let fixture: ComponentFixture<Navbar2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Navbar2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
