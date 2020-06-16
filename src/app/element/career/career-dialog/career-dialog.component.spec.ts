import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDialogComponent } from './career-dialog.component';

describe('CareerDialogComponent', () => {
  let component: CareerDialogComponent;
  let fixture: ComponentFixture<CareerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
