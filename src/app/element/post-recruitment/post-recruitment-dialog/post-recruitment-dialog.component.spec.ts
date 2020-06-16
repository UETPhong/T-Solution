import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecruitmentDialogComponent } from './post-recruitment-dialog.component';

describe('PostRecruitmentDialogComponent', () => {
  let component: PostRecruitmentDialogComponent;
  let fixture: ComponentFixture<PostRecruitmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRecruitmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRecruitmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
