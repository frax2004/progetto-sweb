import { TestBed } from '@angular/core/testing';

import { UserUtilitiesService } from './user.utilities.service';

describe('UserUtilitiesService', () => {
  let service: UserUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
