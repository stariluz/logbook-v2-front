import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsSocialServiceComponent } from './records-social-service.component';

describe('RecordsSocialServiceComponent', () => {
  let component: RecordsSocialServiceComponent;
  let fixture: ComponentFixture<RecordsSocialServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsSocialServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsSocialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
