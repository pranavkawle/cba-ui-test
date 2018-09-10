export interface PersonalLoan {
    id: number;
    name: string;
    carryoverAmount: number;
    earlyRepaymentFee: number;
    interestAmount: number;
    interestRate: number;
    isClosed: boolean;
    principle: number;
    isTopUp: boolean;
}
