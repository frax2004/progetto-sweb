import { TestBed } from '@angular/core/testing';

import { Posts } from './PostsService';

describe('Posts', () => {
  let service: Posts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Posts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
