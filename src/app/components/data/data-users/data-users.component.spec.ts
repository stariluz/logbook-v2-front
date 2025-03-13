import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUsersComponent } from './data-users.component';

describe('DataUsersComponent', () => {
  let component: DataUsersComponent;
  let fixture: ComponentFixture<DataUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
