import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StikyTopComponent } from './stiky-top.component';

describe('StikyTopComponent', () => {
  let component: StikyTopComponent;
  let fixture: ComponentFixture<StikyTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StikyTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StikyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
