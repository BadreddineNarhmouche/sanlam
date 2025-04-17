
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

        public int Id { get; protected set; }
        public virtual int InternalUserId { get; set; }
        public virtual int InternalRoleId { get; set; }

        // Navigation properties
        public virtual InternalRole InternalRole { get; set; }
        public virtual InternalUser InternalUser { get; set; }

        #endregion Properties
    }
}