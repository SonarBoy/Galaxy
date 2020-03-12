import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelestialObjectsDetailsComponent } from './celestial-objects-details.component';

describe('CelestialObjectsDetailsComponent', () => {
  let component: CelestialObjectsDetailsComponent;
  let fixture: ComponentFixture<CelestialObjectsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelestialObjectsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelestialObjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
