import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalLoanComponent } from './personal-loan.component';
import { LoanTopupApplyComponent } from './loan-topup-apply/loan-topup-apply.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanSummaryComponent } from './loan-list/loan-summary/loan-summary.component';
import { LoanDetailsComponent } from './loan-list/loan-details/loan-details.component';
import { PersonalLoanService } from './personal-loan.service';
import { PersonalLoanApplicationComponent } from './personal-loan-application/personal-loan-application.component';
import { PersonalLoanRoutingModule } from './/personal-loan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonalLoanRoutingModule
  ],
  declarations: [
    PersonalLoanComponent,
    LoanTopupApplyComponent,
    LoanListComponent,
    LoanSummaryComponent,
    LoanDetailsComponent,
    PersonalLoanApplicationComponent
  ],
  providers: [
    PersonalLoanService
  ]
})
export class PersonalLoanModule { }
