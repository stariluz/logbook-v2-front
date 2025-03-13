import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsEntriesComponent } from './as-entries-legacy.component';

describe('SsEntriesComponent', () => {
  let component: SsEntriesComponent;
  let fixture: ComponentFixture<SsEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsEntriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
