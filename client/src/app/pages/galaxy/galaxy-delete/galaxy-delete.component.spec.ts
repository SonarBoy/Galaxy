import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxyDeleteComponent } from './galaxy-delete.component';

describe('GalaxyDeleteComponent', () => {
  let component: GalaxyDeleteComponent;
  let fixture: ComponentFixture<GalaxyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalaxyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalaxyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
