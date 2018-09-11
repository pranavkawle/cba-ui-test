import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { PersonalLoanComponent } from './personal-loan.component';
import { LoanTopupApplyComponent } from './loan-topup-apply/loan-topup-apply.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanDetailsComponent } from './loan-list/loan-details/loan-details.component';
import { LoanSummaryComponent } from './loan-list/loan-summary/loan-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorService } from '../error.service';

describe('PersonalLoanComponent', () => {
  let component: PersonalLoanComponent;
  let fixture: ComponentFixture<PersonalLoanComponent>;
  let debugElement: DebugElement;
  let errorService: ErrorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        LoanTopupApplyComponent,
        LoanListComponent,
        LoanSummaryComponent,
        LoanDetailsComponent,
        PersonalLoanComponent
      ],
      providers: [ErrorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalLoanComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called when list loaded event emits', () => {
    spyOn(component, 'onListLoaded');
    const loanListComponent = debugElement.query(By.directive(LoanListComponent));
    const loanListComponentInstance = loanListComponent.componentInstance;
    loanListComponentInstance.loaded.emit(1);
    expect(component.onListLoaded).toHaveBeenCalledWith(1);
  });

  it('should set error message on error', () => {
    errorService = getTestBed().get(ErrorService);
    errorService.setError('test');
    fixture.detectChanges();
    const errorSummaryDiv = debugElement.query(By.css('.error-summary'));
    expect(errorSummaryDiv.nativeElement.textContent).toContain('Error! test');
  });
});
