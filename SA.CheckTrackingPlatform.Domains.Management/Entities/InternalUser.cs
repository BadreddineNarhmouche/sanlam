
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class InternalUser
    {
        #region Constructors

        public InternalUser() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string ElectronicAddress { get; set; }
        public virtual int? ParentInternalUserId { get; set; }

        // Navigation properties
        public virtual InternalUser? ParentInternalUser { get; set; }
        public virtual ICollection<InternalUserInternalRole> InternalUserInternalRoles { get; set; }

        #endregion Properties
    }
}