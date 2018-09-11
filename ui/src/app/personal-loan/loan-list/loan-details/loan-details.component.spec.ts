import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailsComponent } from './loan-details.component';
import { By } from '@angular/platform-browser';

describe('LoanDetailsComponent', () => {
  let component: LoanDetailsComponent;
  let fixture: ComponentFixture<LoanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailsComponent);
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

  it('verify interest amount', () => {
    const amountDiv = fixture.debugElement.query(By.css('.amount[name=interestAmount]'));
    expect(amountDiv.nativeElement.textContent).toContain('222');
  });

  it('verify early repayment fee amount', () => {
    const amountDiv = fixture.debugElement.query(By.css('.amount[name=earlyRepaymentFee]'));
    expect(amountDiv.nativeElement.textContent).toContain('11');
  });

  it('verify carryover amount', () => {
    const amountDiv = fixture.debugElement.query(By.css('.amount[name=carryoverAmount]'));
    expect(amountDiv.nativeElement.textContent).toContain('111');
  });
});
