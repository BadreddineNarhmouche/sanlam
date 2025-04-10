using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("NotificationTypes", Schema = "referential")]
    public class NotificationType : BaseEntity<short>
    {
        #region Constructors

        public NotificationType() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.Code)]
        public virtual string Code { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.Label)]
        public virtual string Label { get; set; }

        #endregion Properties
    }
}