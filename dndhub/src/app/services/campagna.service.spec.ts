import { TestBed } from '@angular/core/testing';

import { Campagna } from './campagna.service';

describe('Campagna', () => {
  let service: Campagna;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Campagna);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
