import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtHomepageComponent } from './rt-homepage.component';

describe('RtHomepageComponent', () => {
  let component: RtHomepageComponent;
  let fixture: ComponentFixture<RtHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
