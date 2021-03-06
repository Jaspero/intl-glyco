import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InstanceSingleComponent} from './instance-single.component';

describe('InstanceSingleComponent', () => {
  let component: InstanceSingleComponent;
  let fixture: ComponentFixture<InstanceSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceSingleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
