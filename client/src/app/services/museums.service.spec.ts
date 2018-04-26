import { TestBed, inject } from '@angular/core/testing';

import { MuseumsService } from './museums.service';

describe('MuseumsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MuseumsService]
    });
  });

  it('should be created', inject([MuseumsService], (service: MuseumsService) => {
    expect(service).toBeTruthy();
  }));
});
