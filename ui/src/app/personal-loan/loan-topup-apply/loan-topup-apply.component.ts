import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-topup-apply',
  templateUrl: './loan-topup-apply.component.html',
  styleUrls: ['./loan-topup-apply.component.scss']
})
export class LoanTopupApplyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onApplyForIncreasedLoanAmountClick() {
    console.log('ApplyForIncreasedLoanAmount');
  }

  onApplyForNewPersonalLoanClick() {
    console.log('ApplyForNewPersonalLoan');
  }

}
