import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssitanshipsReportsComponent } from './assistanships-reports.component';

describe('AssitanshipsReportsComponent', () => {
  let component: AssitanshipsReportsComponent;
  let fixture: ComponentFixture<AssitanshipsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssitanshipsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssitanshipsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
