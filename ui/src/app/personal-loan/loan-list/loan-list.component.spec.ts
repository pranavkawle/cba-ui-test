import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanListComponent } from './loan-list.component';
import { LoanSummaryComponent } from './loan-summary/loan-summary.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonalLoanService } from '../personal-loan.service';
import { Observable, of } from 'rxjs';
import { PersonalLoan } from '../personal-loan';

describe('LoanListComponent', () => {
  let component: LoanListComponent;
  let fixture: ComponentFixture<LoanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        LoanSummaryComponent,
        LoanDetailsComponent,
        LoanListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit number of personal loans in loaded event emitter', () => {
    const list: Array<PersonalLoan> = [
      { carryoverAmount: 111, earlyRepaymentFee: 11, interestAmount: 222, isTopUp: false, name: 'test1', principalAmount: 1000 },
      { carryoverAmount: 111, earlyRepaymentFee: 11, interestAmount: 222, isTopUp: false, name: 'test2', principalAmount: 2000 }
    ];
    const personalLoanService = fixture.debugElement.injector.get(PersonalLoanService);
    spyOn(personalLoanService, 'getAll').and.returnValues(of(list));
    spyOn(component.loaded, 'emit');
    component.ngOnInit();
    expect(component.loaded.emit).toHaveBeenCalledWith(2);
  });

  it('should update personal loans in component when  received from service', () => {
    const list: Array<PersonalLoan> = [
      { carryoverAmount: 111, earlyRepaymentFee: 11, interestAmount: 222, isTopUp: false, name: 'test1', principalAmount: 1000 },
      { carryoverAmount: 111, earlyRepaymentFee: 11, interestAmount: 222, isTopUp: false, name: 'test2', principalAmount: 2000 }
    ];
    const personalLoanService = fixture.debugElement.injector.get(PersonalLoanService);
    spyOn(personalLoanService, 'getAll').and.returnValues(of(list));
    component.ngOnInit();
    const actualResult = component['personalLoans'];
    expect(actualResult.length).toEqual(2);
    expect(actualResult[0].name).toEqual('test1');
    expect(actualResult[1].name).toEqual('test2');
  });
});
