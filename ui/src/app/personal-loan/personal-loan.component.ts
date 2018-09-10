import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-personal-loan',
  templateUrl: './personal-loan.component.html',
  styleUrls: ['./personal-loan.component.scss']
})
export class PersonalLoanComponent implements OnInit {
  count: number;
  error: string;

  constructor(private errorService: ErrorService) {
    this.count = 0;
  }

  ngOnInit() {
    this.errorService.getError().subscribe(error => {
      this.error = error;
    });
  }

  onListLoaded(count: number) {
    this.count = count;
  }
}
