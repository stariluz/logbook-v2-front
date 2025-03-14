import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabActionComponent } from './tab-action.component';

describe('TabActionComponent', () => {
  let component: TabActionComponent;
  let fixture: ComponentFixture<TabActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
