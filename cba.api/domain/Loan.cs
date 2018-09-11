namespace Domain
{
    public class Loan
    {
        public string Name { get; set; }
        public decimal PrincipalAmount { get; set; }
        public decimal InterestAmount { get; set; }
        public bool IsClosed { get; set; }
    }
}
