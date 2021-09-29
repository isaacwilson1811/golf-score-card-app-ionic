import { TestBed } from '@angular/core/testing';

import { FireStoreService } from './firestore.service';

describe('DatabaseService', () => {
  let service: FireStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
