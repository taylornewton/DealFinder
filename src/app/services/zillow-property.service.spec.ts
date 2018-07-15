import { TestBed, inject } from '@angular/core/testing';

import { ZillowPropertyService } from './zillow-property.service';

describe('Service: ZillowPropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZillowPropertyService]
    });
  });

  it('should be created', inject([ZillowPropertyService], (service: ZillowPropertyService) => {
    expect(service).toBeTruthy();
  }));
});
