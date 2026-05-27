import { TestBed } from '@angular/core/testing';

import { FakeDb } from '../components/scrollbar/fake-db';

describe('FakeDb', () => {
  let service: FakeDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
