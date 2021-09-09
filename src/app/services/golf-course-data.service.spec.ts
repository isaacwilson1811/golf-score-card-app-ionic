import { TestBed } from '@angular/core/testing';

import { GolfCourseDataService } from './golf-course-data.service';

describe('GolfCourseDataService', () => {
  let service: GolfCourseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GolfCourseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
