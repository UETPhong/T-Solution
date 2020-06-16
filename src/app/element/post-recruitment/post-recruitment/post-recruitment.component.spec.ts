import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecruitmentComponent } from './post-recruitment.component';

describe('PostRecruitmentComponent', () => {
  let component: PostRecruitmentComponent;
  let fixture: ComponentFixture<PostRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
