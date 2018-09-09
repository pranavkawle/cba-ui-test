import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTopupApplyComponent } from './loan-topup-apply.component';

describe('LoanTopupApplyComponent', () => {
  let component: LoanTopupApplyComponent;
  let fixture: ComponentFixture<LoanTopupApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanTopupApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTopupApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
