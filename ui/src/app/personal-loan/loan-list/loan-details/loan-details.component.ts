import { Component, OnInit, Input } from '@angular/core';
import { PersonalLoan } from '../../personal-loan';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit {
  @Input() personalLoan: PersonalLoan;

  constructor() { }

  ngOnInit() {
  }

}
