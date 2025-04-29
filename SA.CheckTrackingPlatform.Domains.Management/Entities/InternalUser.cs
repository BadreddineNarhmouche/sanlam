
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class InternalUser : BaseEntity<int>
    {
        #region Constructors

        public InternalUser() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public string ElectronicAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // Navigation properties
        public ICollection<Timeline> Timelines { get; set; }
        public ICollection<InternalUserInternalRole> UserRoles { get; set; }

        #endregion Properties
    }
}