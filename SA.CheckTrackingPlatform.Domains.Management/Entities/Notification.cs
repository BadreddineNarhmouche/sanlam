
using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Notification : BaseEntity<int>
    {
        #region Constructors

        public Notification() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public virtual string Subject { get; set; }
        public virtual string Body { get; set; }
        public int IsSeen { get; set; }
        [ForeignKey(nameof(InternalUser))]
        public virtual int? InternalUserId { get; set; }
        [ForeignKey(nameof(NotificationType))]
        public virtual int? NotificationTypeId { get; set; }
        [ForeignKey(nameof(InternalRole))]
        public virtual int? InternalRoleId { get; set; }
        // Navigation properties
        public virtual InternalRole? InternalRole { get; set; }
        public virtual InternalUser? InternalUser { get; set; }
        public virtual NotificationType? NotificationType { get; set; }

        #endregion Properties
    }
}