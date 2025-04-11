using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("Notifications", Schema = "notification")]
    public class Notification : BaseEntity<long>
    {
        #region Constructors

        public Notification() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.Subject)]
        public virtual string Subject { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.Body)]
        public virtual string Body { get; set; }

        public bool IsSeen { get; set; }

        [ForeignKey(nameof(InternalUser))] // propriéte de navigation 
        public virtual int? InternalUserId { get; set; }
        public virtual InternalUser? InternalUser { get; set; }

        [ForeignKey(nameof(NotificationType))]
        public virtual short? NotificationTypeId { get; set; }
        public virtual NotificationType? NotificationType { get; set; }

        [ForeignKey(nameof(InternalRole))]
        public virtual int? InternalRoleId { get; set; }
        public virtual InternalRole? InternalRole { get; set; }

        #endregion Properties
    }
}