using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("InternalUserBranchPartners", Schema = "authority")]
    public class InternalUserBranchPartner : BaseEntity<int>
    {
        #region Constructors

        public InternalUserBranchPartner() : base()
        {
        }

        #endregion Constructors

        #region Properties
        [Required(AllowEmptyStrings = false)]
        [ForeignKey(nameof(InternalUser))]
        public virtual int InternalUserId { get; set; }

        public virtual InternalUser InternalUser { get; set; }

        public virtual string ExternalBranchId { get; set; }

        public virtual string ExternalPartnerUserCode { get; set; }

        public virtual string WorkFlowStepCode { get; set; }

        #endregion Properties
    }
}