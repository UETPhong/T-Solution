import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleDialogComponent } from './job-title-dialog.component';

describe('JobTitleDialogComponent', () => {
  let component: JobTitleDialogComponent;
  let fixture: ComponentFixture<JobTitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
