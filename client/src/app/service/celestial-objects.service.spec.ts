import { TestBed } from '@angular/core/testing';

import { CelestialObjectsService } from './celestial-objects.service';

describe('CelestialObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CelestialObjectsService = TestBed.get(CelestialObjectsService);
    expect(service).toBeTruthy();
  });
});
