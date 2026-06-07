import { TestBed } from '@angular/core/testing';

import { CharacterManagementService } from './character.management.service';

describe('CharacterManagementService', () => {
  let service: CharacterManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
