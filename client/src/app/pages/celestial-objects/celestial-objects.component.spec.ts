import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelestialObjectsComponent } from './celestial-objects.component';

describe('CelestialObjectsComponent', () => {
  let component: CelestialObjectsComponent;
  let fixture: ComponentFixture<CelestialObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelestialObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelestialObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
