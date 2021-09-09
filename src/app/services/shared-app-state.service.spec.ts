import { TestBed } from '@angular/core/testing';

import { SharedAppStateService } from './shared-app-state.service';

describe('SharedAppStateService', () => {
  let service: SharedAppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
