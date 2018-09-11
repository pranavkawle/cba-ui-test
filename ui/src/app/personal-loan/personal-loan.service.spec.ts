import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PersonalLoanService } from './personal-loan.service';
import { Constants } from '../constants';
import { PersonalLoan } from './personal-loan';

describe('PersonalLoanService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonalLoanService]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PersonalLoanService], (service: PersonalLoanService) => {
    expect(service).toBeTruthy();
  }));

  it('should get personal loan with name', inject([PersonalLoanService], (service: PersonalLoanService) => {
    service.get('test').subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.name).toEqual('test');
      expect(data.principalAmount).toEqual(1000);
    });

    const expectedResult: PersonalLoan = {
      carryoverAmount: 111,
      earlyRepaymentFee: 11,
      interestAmount: 222,
      isTopUp: false,
      name: 'test',
      principalAmount: 1000
    };
    const testRequest = httpMock.expectOne(`${Constants.baseUrl}/personal-loan/test`);
    expect(testRequest.request.method).toEqual('GET');
    testRequest.flush(expectedResult);
  }));

  it('should get personal loan with invalid name', inject([PersonalLoanService], (service: PersonalLoanService) => {
    service.get(undefined).subscribe(data => {
      expect(data).toBeFalsy();
    });
    httpMock.expectNone(`${Constants.baseUrl}/personal-loan/test`);
  }));

  it('should get list of personal loans', inject([PersonalLoanService], (service: PersonalLoanService) => {
    service.getAll().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toEqual(2);
      expect(data[0].name).toEqual('test1');
      expect(data[0].principalAmount).toEqual(1000);
      expect(data[1].name).toEqual('test2');
      expect(data[1].principalAmount).toEqual(2000);
    });

    const expectedResult: Array<PersonalLoan> = [
      { carryoverAmount: 111, earlyRepaymentFee: 11, interestAmount: 222, isTopUp: false, name: 'test1', principalAmount: 1000 },
      { carryoverAmount: 111, earlyRepaymentFee: 11, interestAmount: 222, isTopUp: false, name: 'test2', principalAmount: 2000 }
    ];
    const testRequest = httpMock.expectOne(`${Constants.baseUrl}/personal-loan`);
    expect(testRequest.request.method).toEqual('GET');
    testRequest.flush(expectedResult);
  }));

  it('should add new personal loan with success', inject([PersonalLoanService], (service: PersonalLoanService) => {
    const loan: PersonalLoan = {
      carryoverAmount: 111,
      earlyRepaymentFee: 11,
      interestAmount: 222,
      isTopUp: false,
      name: 'test',
      principalAmount: 1000
    };

    service.add(loan).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.isSuccess).toEqual(true);
    });

    const testRequest = httpMock.expectOne(`${Constants.baseUrl}/personal-loan`);
    expect(testRequest.request.method).toEqual('POST');
    testRequest.flush({ isSuccess: true });
  }));

  it('should fail adding new personal loan', inject([PersonalLoanService], (service: PersonalLoanService) => {
    service.add(undefined).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.isSuccess).toEqual(false);
    });

    const testRequest = httpMock.expectOne(`${Constants.baseUrl}/personal-loan`);
    expect(testRequest.request.method).toEqual('POST');
    testRequest.flush({ isSuccess: false });
  }));
});
