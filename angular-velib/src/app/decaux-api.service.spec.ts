import { TestBed } from '@angular/core/testing';

import { DecauxAPIService } from './decaux-api.service';

describe('DecauxAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecauxAPIService = TestBed.get(DecauxAPIService);
    expect(service).toBeTruthy();
  });
});
