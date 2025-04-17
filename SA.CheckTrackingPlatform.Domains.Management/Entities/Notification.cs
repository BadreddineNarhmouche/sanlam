
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Notification
    {
        #region Constructors

        public Notification() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public virtual string Subject { get; set; }
        public virtual string Body { get; set; }
        public bool IsSeen { get; set; }
<<<<<<< HEAD

        [ForeignKey(nameof(InternalUser))] // propriéte de navigation 
=======
>>>>>>> origin/develop
        public virtual int? InternalUserId { get; set; }
        public virtual short? NotificationTypeId { get; set; }
        public virtual int? InternalRoleId { get; set; }

        // Navigation properties
        public virtual InternalRole? InternalRole { get; set; }
        public virtual InternalUser? InternalUser { get; set; }
        public virtual NotificationType? NotificationType { get; set; }

        #endregion Properties
    }
}