import { TestBed, inject } from '@angular/core/testing';

import { PersonalLoanService } from './personal-loan.service';

describe('PersonalLoanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalLoanService]
    });
  });

  it('should be created', inject([PersonalLoanService], (service: PersonalLoanService) => {
    expect(service).toBeTruthy();
  }));
});
