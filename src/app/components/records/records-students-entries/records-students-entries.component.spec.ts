import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsStudentsEntriesComponent } from './records-students-entries.component';

describe('RecordsStudentsEntriesComponent', () => {
  let component: RecordsStudentsEntriesComponent;
  let fixture: ComponentFixture<RecordsStudentsEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsStudentsEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsStudentsEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
