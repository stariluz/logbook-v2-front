import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantshipsComponent } from './assistantships.component';

describe('AssistantshipsComponent', () => {
  let component: AssistantshipsComponent;
  let fixture: ComponentFixture<AssistantshipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistantshipsComponent]
    });
    fixture = TestBed.createComponent(AssistantshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
