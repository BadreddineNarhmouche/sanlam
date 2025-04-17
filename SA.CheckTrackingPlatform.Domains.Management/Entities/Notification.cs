
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
        public virtual int? InternalUserId { get; set; }
        public virtual int? NotificationTypeId { get; set; }
        public virtual int? InternalRoleId { get; set; }
        public DateTime CreationDate { get; set; }
        public virtual string CreatedById { get; set; }

        // Navigation properties
        public virtual InternalRole? InternalRole { get; set; }
        public virtual InternalUser? InternalUser { get; set; }
        public virtual NotificationType? NotificationType { get; set; }

        #endregion Properties
    }
}