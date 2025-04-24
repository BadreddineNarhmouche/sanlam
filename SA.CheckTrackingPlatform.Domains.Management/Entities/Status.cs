
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Status : BaseEntity<int>
    {
        #region Constructors

        public Status() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Timeline> Timelines { get; set; }


        #endregion Properties
    }
}
