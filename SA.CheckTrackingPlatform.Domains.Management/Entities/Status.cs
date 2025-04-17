using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("Status", Schema = "core")]
    public class Status : BaseEntity<int>
    {
        #region Constructors

        public Status() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Timeline> Timelines { get; set; }


        #endregion Properties
    }
}
