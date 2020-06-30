import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChoiceUsComponent } from './why-choice-us.component';

describe('WhyChoiceUsComponent', () => {
  let component: WhyChoiceUsComponent;
  let fixture: ComponentFixture<WhyChoiceUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyChoiceUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyChoiceUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
