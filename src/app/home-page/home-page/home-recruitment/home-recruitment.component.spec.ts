import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecruitmentComponent } from './home-recruitment.component';

describe('HomeRecruitmentComponent', () => {
  let component: HomeRecruitmentComponent;
  let fixture: ComponentFixture<HomeRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
