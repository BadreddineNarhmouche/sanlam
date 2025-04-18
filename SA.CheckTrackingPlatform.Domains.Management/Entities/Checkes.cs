
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Checks
    {
        #region Constructors

        public Checks() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public int ServiceId { get; set; }
        public DateTime CreationDate { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string RecipientName { get; set; }
        public string SinisterNumber { get; set; }
        public string AccountNumber { get; set; }
        public string RegisterOrderNumber { get; set; }
        public decimal TransactionNumber { get; set; }
        public string BeneficiaryName { get; set; }

        // Navigation properties
        public Bank Bank { get; set; }
        public Branch Branch { get; set; }
        public Service Service { get; set; }
        public ICollection<Timeline> Timelines { get; set; }

        #endregion Properties
    }
}
