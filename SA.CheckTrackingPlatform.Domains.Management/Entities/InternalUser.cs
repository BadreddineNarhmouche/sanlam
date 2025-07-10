
using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations.Schema;

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
        [ForeignKey(nameof(Service))]
        public int? ServiceId { get; set; }

        // Navigation properties
        public ICollection<Timeline> Timelines { get; set; }
        public ICollection<InternalUserInternalRole> UserRoles { get; set; }

        #endregion Properties
    }
}