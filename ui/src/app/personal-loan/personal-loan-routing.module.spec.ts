import { PersonalLoanRoutingModule } from './personal-loan-routing.module';

describe('PersonalLoanRoutingModule', () => {
  let personalLoanRoutingModule: PersonalLoanRoutingModule;

  beforeEach(() => {
    personalLoanRoutingModule = new PersonalLoanRoutingModule();
  });

  it('should create an instance', () => {
    expect(personalLoanRoutingModule).toBeTruthy();
  });
});
