import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPositionDialogComponent } from './job-position-dialog.component';

describe('JobPositionDialogComponent', () => {
  let component: JobPositionDialogComponent;
  let fixture: ComponentFixture<JobPositionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPositionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
