import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoanTopupApplyComponent } from './loan-topup-apply.component';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersonalLoanService } from '../personal-loan.service';

describe('LoanTopupApplyComponent', () => {
  let component: LoanTopupApplyComponent;
  let fixture: ComponentFixture<LoanTopupApplyComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LoanTopupApplyComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTopupApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to loan application on apply new button click', () => {
    const button = fixture.debugElement.query(By.css('button[name=applyForNewPersonalLoan]'));
    button.nativeElement.click();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['personal-loan', 'apply']);
  });

  it('should update personal loan when available through service', () => {
    expect(component['personalLoan']).toBeNull();
    const personalLoanService = fixture.debugElement.injector.get(PersonalLoanService);
    personalLoanService.setPersonalLoan({
      carryoverAmount: 111,
      earlyRepaymentFee: 11,
      interestAmount: 222,
      isTopUp: false,
      name: 'test',
      principalAmount: 1000
    });
    expect(component['personalLoan']).toBeDefined();
  });

  it('should return carryover amount as 0 when personal loan not available', () => {
    const carryover = component.getCarryoverAmount();
    expect(carryover).toEqual(0);
  });

  it('should return carryover valid amount when personal loan available', () => {
    const personalLoanService = fixture.debugElement.injector.get(PersonalLoanService);
    personalLoanService.setPersonalLoan({
      carryoverAmount: 111,
      earlyRepaymentFee: 11,
      interestAmount: 222,
      isTopUp: false,
      name: 'test',
      principalAmount: 1000
    });
    const carryover = component.getCarryoverAmount();
    expect(carryover).toEqual(111);
  });
});
