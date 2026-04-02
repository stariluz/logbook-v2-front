import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEntriesHomepageComponent } from './student-entries-homepage.component';

describe('StudentEntriesHomepageComponent', () => {
  let component: StudentEntriesHomepageComponent;
  let fixture: ComponentFixture<StudentEntriesHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEntriesHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEntriesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
