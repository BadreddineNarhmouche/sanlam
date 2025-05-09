
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Timeline : BaseEntity<int>
    {
        #region Constructors

        public Timeline() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int CheckId { get; set; }
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        [ForeignKey(nameof(Status))]
        public int StatusId { get; set; }
        public string ReasonLabel { get; set; }


        public InternalUser User { get; set; }
        public Status Status { get; set; }

        #endregion Properties
    }
}
