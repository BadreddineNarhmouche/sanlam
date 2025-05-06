
using System.ComponentModel.DataAnnotations;      
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
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
        public int Id { get; protected set; }
        [ForeignKey(nameof(InternalUser))]
        public int InternalUserId { get; set; }
        [ForeignKey(nameof(InternalRole))]
        public int InternalRoleId { get; set; }

        // Navigation properties
        public InternalUser InternalUser { get; set; }
        public InternalRole InternalRole { get; set; }

        #endregion Properties
    }
}