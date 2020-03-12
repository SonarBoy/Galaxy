import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelestialObjectsDeleteComponent } from './celestial-objects-delete.component';

describe('CelestialObjectsDeleteComponent', () => {
  let component: CelestialObjectsDeleteComponent;
  let fixture: ComponentFixture<CelestialObjectsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelestialObjectsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelestialObjectsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
