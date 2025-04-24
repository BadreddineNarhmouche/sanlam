
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class InternalUserInternalRole : BaseEntity<int>
    {
        #region Constructors

        public InternalUserInternalRole() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public int InternalUserId { get; set; }
        public int InternalRoleId { get; set; }

        // Navigation properties
        public InternalUser InternalUser { get; set; }
        public InternalRole InternalRole { get; set; }

        #endregion Properties
    }
}