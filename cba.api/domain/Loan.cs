namespace Domain
{
    public class Loan
    {
        public int Id { get; set; }
        public decimal Principle { get; set; }
        public decimal InterestRate { get; set; }
        public bool IsClosed { get; set; }
    }
}
