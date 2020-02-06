import { TestBed } from '@angular/core/testing';

import { FakeHttpService } from './fake-http.service';

describe('FakeHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeHttpService = TestBed.get(FakeHttpService);
    expect(service).toBeTruthy();
  });
});
