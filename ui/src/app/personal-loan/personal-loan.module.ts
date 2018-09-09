import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalLoanComponent } from './personal-loan.component';
import { LoanTopupApplyComponent } from './loan-topup-apply/loan-topup-apply.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanSummaryComponent } from './loan-list/loan-summary/loan-summary.component';
import { LoanDetailsComponent } from './loan-list/loan-details/loan-details.component';
import { PersonalLoanService } from './personal-loan.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PersonalLoanComponent,
    LoanTopupApplyComponent,
    LoanListComponent,
    LoanSummaryComponent,
    LoanDetailsComponent
  ],
  exports: [
    PersonalLoanComponent
  ],
  providers: [
    PersonalLoanService
  ]
})
export class PersonalLoanModule { }
