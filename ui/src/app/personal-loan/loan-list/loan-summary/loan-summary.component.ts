import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonalLoan } from '../../personal-loan';
import { PersonalLoanService } from '../../personal-loan.service';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.scss']
})
export class LoanSummaryComponent implements OnInit {
  @Input() index: number;
  @Input() personalLoan: PersonalLoan;
  @Output() clicked: EventEmitter<PersonalLoan>;

  private showDetails: boolean;

  constructor(private personalLoanService: PersonalLoanService) {
    this.showDetails = false;
    this.clicked = new EventEmitter<PersonalLoan>();
  }

  ngOnInit() {
  }

  onSummaryClick() {
    this.showDetails = !this.showDetails;
    this.personalLoanService.setPersonalLoan(this.personalLoan);
  }
}
