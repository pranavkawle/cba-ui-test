namespace Domain
{
    public class PersonalLoan : Loan
    {
        public decimal EarlyRepaymentFee { get; set; }
        public decimal CarryoverAmount { get; set; }
        public bool IsTopUp { get; set; }
    }
}
