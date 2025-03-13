import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFilesComponent } from './data-files.component';

describe('DataFilesComponent', () => {
  let component: DataFilesComponent;
  let fixture: ComponentFixture<DataFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
