
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class NotificationType : BaseEntity<int>
    {
        #region Constructors

        public NotificationType() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public virtual string Code { get; set; }
        public virtual string Label { get; set; }

        #endregion Properties
    }
}