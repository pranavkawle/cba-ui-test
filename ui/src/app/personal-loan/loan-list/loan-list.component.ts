import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonalLoanService } from '../personal-loan.service';
import { PersonalLoan } from '../personal-loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
  @Output() loaded: EventEmitter<number>;
  private personalLoans: Array<PersonalLoan>;

  constructor(private personalLoanService: PersonalLoanService) {
    this.loaded = new EventEmitter<number>();
    this.personalLoans = [];
  }

  ngOnInit() {
    this.personalLoanService.getAll()
      .subscribe(data => {
        if (data) {
          this.personalLoans = data;
          this.loaded.emit(this.personalLoans.length);
          // this.personalLoanService.setPersonalLoanCount(this.personalLoans.length);
        }
      });
  }
}
