import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentApplyDialogComponent } from './recruitment-apply-dialog.component';

describe('RecruitmentApplyDialogComponent', () => {
  let component: RecruitmentApplyDialogComponent;
  let fixture: ComponentFixture<RecruitmentApplyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentApplyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentApplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
