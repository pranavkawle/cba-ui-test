import { PersonalLoanModule } from './personal-loan.module';

describe('PersonalLoanModule', () => {
  let personalLoanModule: PersonalLoanModule;

  beforeEach(() => {
    personalLoanModule = new PersonalLoanModule();
  });

  it('should create an instance', () => {
    expect(personalLoanModule).toBeTruthy();
  });
});
