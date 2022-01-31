import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialityWaiverFormComponent } from './confidentiality-waiver-form.component';

describe('ConfidentialityWaiverFormComponent', () => {
  let component: ConfidentialityWaiverFormComponent;
  let fixture: ComponentFixture<ConfidentialityWaiverFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfidentialityWaiverFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfidentialityWaiverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
