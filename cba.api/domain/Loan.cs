namespace Domain
{
    public class Loan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Principle { get; set; }
        public decimal InterestAmount { get; set; }
        public decimal InterestRate { get; set; }
        public bool IsClosed { get; set; }
    }
}
