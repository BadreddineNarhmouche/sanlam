
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class InternalRole : BaseEntity<int>
    {
        #region Constructors

        public InternalRole() : base()
        {
        }

        #endregion Constructors

        #region Properties
        
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<InternalUserInternalRole> UserRoles { get; set; }

        #endregion Properties
    }
}