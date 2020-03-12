import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxyDetailsComponent } from './galaxy-details.component';

describe('GalaxyDetailsComponent', () => {
  let component: GalaxyDetailsComponent;
  let fixture: ComponentFixture<GalaxyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalaxyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalaxyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
