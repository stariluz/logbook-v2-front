import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssitanshipsComponent } from './assitanships.component';

describe('AssitanshipsComponent', () => {
  let component: AssitanshipsComponent;
  let fixture: ComponentFixture<AssitanshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssitanshipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssitanshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
