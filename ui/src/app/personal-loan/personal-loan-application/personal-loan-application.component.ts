import { Component, OnInit } from '@angular/core';
import { PersonalLoan } from 'src/app/personal-loan/personal-loan';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonalLoanService } from '../personal-loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-loan-application',
  templateUrl: './personal-loan-application.component.html',
  styleUrls: ['./personal-loan-application.component.scss']
})
export class PersonalLoanApplicationComponent implements OnInit {
  private submitted: boolean;
  personalLoanForm: FormGroup;

  constructor(private personalLoanService: PersonalLoanService, private router: Router) {
    this.submitted = false;
  }

  ngOnInit() {
    const currencyValidators = [
      Validators.required,
      Validators.min(0),
      Validators.pattern('[0-9.]*')
    ];
    this.personalLoanForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'balance': new FormControl(0, currencyValidators),
      'interest': new FormControl(0, currencyValidators),
      'earlyRepayment': new FormControl(0, currencyValidators),
      'carryover': new FormControl(0, currencyValidators),
      'topUp': new FormControl(false)
    });
  }

  get form() { return this.personalLoanForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.personalLoanForm.invalid) {
      return;
    }

    const controls = this.personalLoanForm.controls;
    const personalLoan = {
      name: controls.name.value,
      carryoverAmount: controls.carryover.value,
      earlyRepaymentFee: controls.earlyRepayment.value,
      interestAmount: controls.interest.value,
      principalAmount: controls.balance.value,
      isTopUp: false
    };

    this.personalLoanService.add(personalLoan).subscribe(data => {
      if (data && data.isSuccess) {
        this.router.navigate(['personal-loan', 'list']);
      }
    });
  }

  onCancel() {
    this.submitted = false;
    this.personalLoanForm.clearValidators();
    this.router.navigate(['personal-loan', 'list']);
  }
}
