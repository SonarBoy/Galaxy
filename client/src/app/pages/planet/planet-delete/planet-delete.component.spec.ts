import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDeleteComponent } from './planet-delete.component';

describe('PlanetDeleteComponent', () => {
  let component: PlanetDeleteComponent;
  let fixture: ComponentFixture<PlanetDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
