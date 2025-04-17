using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("InternalUsers", Schema = "authority")]
    public class InternalUser : BaseEntity<int>
    {
        #region Constructors

        public InternalUser() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.FirstName)]
        public virtual string FirstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.LastName)]
        public virtual string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.ElectronicAddress)]
        public virtual string ElectronicAddress { get; set; }

        [ForeignKey(nameof(ParentInternalUser))]
        public virtual int? ParentInternalUserId { get; set; }

        public virtual InternalUser? ParentInternalUser { get; set; }

        public virtual ICollection<InternalUserInternalRole> InternalUserInternalRoles { get; set; }

        #endregion Properties
    }
}