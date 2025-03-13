import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAssistantshipsComponent } from './reports-assistantships.component';

describe('ReportsAssistantshipsComponent', () => {
  let component: ReportsAssistantshipsComponent;
  let fixture: ComponentFixture<ReportsAssistantshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsAssistantshipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsAssistantshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
