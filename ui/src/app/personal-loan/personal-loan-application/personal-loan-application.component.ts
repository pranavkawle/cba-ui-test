import { Component, OnInit } from '@angular/core';
import { PersonalLoan } from 'src/app/personal-loan/personal-loan';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-loan-application',
  templateUrl: './personal-loan-application.component.html',
  styleUrls: ['./personal-loan-application.component.scss']
})
export class PersonalLoanApplicationComponent implements OnInit {
  private personalLoan: PersonalLoan;
  personalLoanForm: FormGroup;

  constructor() {
    this.personalLoan = {
      id: 0,
      name: '',
      carryoverAmount: 0,
      earlyRepaymentFee: 0,
      interestAmount: 0,
      interestRate: 0,
      isClosed: false,
      principle: 0,
      isTopUp: false
    };
  }

  ngOnInit() {
    const currencyValidators = [
      Validators.required,
      Validators.min(0),
      Validators.pattern('[0-9.]*')
    ];
    this.personalLoanForm = new FormGroup({
      'name': new FormControl(this.personalLoan.name, [Validators.required]),
      'balance': new FormControl(this.personalLoan.principle, currencyValidators),
      'interest': new FormControl(this.personalLoan.interestAmount, currencyValidators),
      'earlyRepayment': new FormControl(this.personalLoan.earlyRepaymentFee, currencyValidators),
      'carryover': new FormControl(this.personalLoan.carryoverAmount, currencyValidators),
      'topUp': new FormControl(this.personalLoan.isTopUp)
    });
  }

  get name() { return this.personalLoanForm.get('name'); }
  get balance() { return this.personalLoanForm.get('balance'); }
  get interest() { return this.personalLoanForm.get('interest'); }
  get earlyRepayment() { return this.personalLoanForm.get('earlyRepayment'); }
  get carryover() { return this.personalLoanForm.get('carryover'); }
  get topUp() { return this.personalLoanForm.get('topUp'); }
}
