import { TestBed, inject } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService]
    });
  });

  it('should be created', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy();
  }));

  it('should set and get error message', inject([ErrorService], (service: ErrorService) => {
    service.setError('Test');
    service.getError().subscribe(error => {
      expect(error).toEqual('Test');
    });
  }));

  it('should clear error message', inject([ErrorService], (service: ErrorService) => {
    service.setError('Test');
    service.clearError();
    service.getError().subscribe(error => {
      expect(error).toEqual(null);
    });
  }));
});
