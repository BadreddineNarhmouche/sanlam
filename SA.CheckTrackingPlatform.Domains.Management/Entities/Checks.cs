
using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Checks : BaseEntity<int>
    {
        #region Constructors

        public Checks() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public double Amount { get; set; }
        [ForeignKey(nameof(Bank))]
        public int BankId { get; set; }
        [ForeignKey(nameof(Branch))]
        public int BranchId { get; set; }
        [ForeignKey(nameof(Service))]
        public int ServiceId { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string RecipientName { get; set; }
        public string SinisterNumber { get; set; }
        public string AccountNumber { get; set; }
        public string RegisterOrderNumber { get; set; }
        public string TransactionNumber { get; set; }
        public string BeneficiaryName { get; set; }

        public Bank Bank { get; set; }
        public Branch Branch { get; set; }
        public Service Service { get; set; }
        public ICollection<Timeline> Timelines { get; set; }

        #endregion Properties
    }
}
