import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HagashatBakashComponent } from './hagashat-bakash.component';

describe('HagashatBakashComponent', () => {
  let component: HagashatBakashComponent;
  let fixture: ComponentFixture<HagashatBakashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HagashatBakashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HagashatBakashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
