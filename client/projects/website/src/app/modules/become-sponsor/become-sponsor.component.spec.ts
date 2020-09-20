import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeSponsorComponent } from './become-sponsor.component';

describe('BecomeSponsorComponent', () => {
  let component: BecomeSponsorComponent;
  let fixture: ComponentFixture<BecomeSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
