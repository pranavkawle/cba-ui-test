import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoanSummaryComponent } from './loan-summary.component';
import { FormsModule } from '@angular/forms';
import { LoanDetailsComponent } from '../loan-details/loan-details.component';
import { By } from '@angular/platform-browser';
import { PersonalLoanService } from '../../personal-loan.service';

describe('LoanSummaryComponent', () => {
  let component: LoanSummaryComponent;
  let fixture: ComponentFixture<LoanSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ LoanDetailsComponent, LoanSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSummaryComponent);
    component = fixture.componentInstance;
    component.personalLoan = {
      carryoverAmount: 111,
      earlyRepaymentFee: 11,
      interestAmount: 222,
      isTopUp: false,
      name: 'test',
      principalAmount: 1000
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show detail section when clicked on header', () => {
    expect(component['showDetails']).toBeFalsy();
    const basicDiv = fixture.debugElement.query(By.css('.basic'));
    basicDiv.nativeElement.click();
    expect(component['showDetails']).toBeTruthy();
  });

  it('should set personal loan in service when clicked on header', () => {
    const personalLoanService = fixture.debugElement.injector.get(PersonalLoanService);
    spyOn(personalLoanService, 'setPersonalLoan');
    const basicDiv = fixture.debugElement.query(By.css('.basic'));
    basicDiv.nativeElement.click();
    expect(personalLoanService.setPersonalLoan).toHaveBeenCalledWith(component['personalLoan']);
  });

  it('verify principal amount', () => {
    const amountDiv = fixture.debugElement.query(By.css('.amount'));
    expect(amountDiv.nativeElement.textContent).toContain('1,000');
  });
});
