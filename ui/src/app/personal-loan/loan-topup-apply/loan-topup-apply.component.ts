import { Component, OnInit, Input } from '@angular/core';
import { PersonalLoanService } from '../personal-loan.service';
import { PersonalLoan } from '../personal-loan';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-topup-apply',
  templateUrl: './loan-topup-apply.component.html',
  styleUrls: ['./loan-topup-apply.component.scss']
})
export class LoanTopupApplyComponent implements OnInit {
  @Input() count: number;
  private personalLoan: PersonalLoan;

  constructor(private personalLoanService: PersonalLoanService, private router: Router) { }

  ngOnInit() {
    this.personalLoanService.getPersonalLoan()
      .subscribe(data => {
        this.personalLoan = data;
      });
  }

  getCarryoverAmount(): number {
    return this.personalLoan && this.personalLoan.carryoverAmount > 0 ? this.personalLoan.carryoverAmount : 0;
  }

  onApplyForIncreasedLoanAmountClick() {
    console.log('Clicked to apply for increased loan amount');
  }

  onApplyForNewPersonalLoanClick() {
    this.router.navigate(['personal-loan', 'apply']);
  }

}
