import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonalLoanApplicationComponent } from './personal-loan-application.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalLoan } from '../personal-loan';
import { PersonalLoanService } from '../personal-loan.service';

describe('PersonalLoanApplicationComponent', () => {
  let component: PersonalLoanApplicationComponent;
  let fixture: ComponentFixture<PersonalLoanApplicationComponent>;
  let personalLoanService: PersonalLoanService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [PersonalLoanApplicationComponent],
      providers: [PersonalLoanService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    personalLoanService = getTestBed().get(PersonalLoanService);
    fixture = TestBed.createComponent(PersonalLoanApplicationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form return invalid when empty', () => {
    expect(component.personalLoanForm.valid).toBeFalsy();
  });

  it('should name field return invalid when empty', () => {
    const name = component.personalLoanForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });

  it('should name field fire required validation when empty', () => {
    let errors = {};
    const name = component.personalLoanForm.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should form group controls return values', () => {
    expect(component.personalLoanForm.valid).toBeFalsy();
    component.personalLoanForm.controls['name'].setValue('test');
    component.personalLoanForm.controls['balance'].setValue('1000');
    expect(component.personalLoanForm.valid).toBeTruthy();
    expect(component.personalLoanForm.invalid).toBeFalsy();
  });
});
