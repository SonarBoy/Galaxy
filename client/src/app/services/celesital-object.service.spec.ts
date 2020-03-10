import { TestBed } from '@angular/core/testing';

import { CelesitalObjectService } from './celesital-object.service';

describe('CelesitalObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CelesitalObjectService = TestBed.get(CelesitalObjectService);
    expect(service).toBeTruthy();
  });
});
