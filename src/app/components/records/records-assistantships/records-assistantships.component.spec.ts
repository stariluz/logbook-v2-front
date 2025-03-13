import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsAssistantshipsComponent } from './records-assistantships.component';

describe('RecordsAssistantshipsComponent', () => {
  let component: RecordsAssistantshipsComponent;
  let fixture: ComponentFixture<RecordsAssistantshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsAssistantshipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsAssistantshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
