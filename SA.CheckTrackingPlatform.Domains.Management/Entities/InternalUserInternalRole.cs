using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("InternalUserInternalRoles", Schema = "authority")]
    public class InternalUserInternalRole
    {
        #region Constructors

        public InternalUserInternalRole() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual long Id { get; protected set; }

        [ForeignKey(nameof(InternalUser))]
        public virtual int InternalUserId { get; set; }

        public virtual InternalUser InternalUser { get; set; }

        [ForeignKey(nameof(InternalRole))]
        public virtual int InternalRoleId { get; set; }

        public virtual InternalRole InternalRole { get; set; }

        #endregion Properties
    }
}