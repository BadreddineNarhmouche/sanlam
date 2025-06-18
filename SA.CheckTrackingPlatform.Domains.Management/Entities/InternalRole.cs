
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class InternalRole
    {
        #region Constructors

        public InternalRole() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; protected set; }
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<InternalUserInternalRole> UserRoles { get; set; }

        #endregion Properties
    }
}