
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Service : BaseEntity<int>
    {
        #region Constructors

        public Service() : base()
        {
        }

        #endregion Constructors

        #region Properties
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Checks> Checks { get; set; }


        #endregion Properties
    }
}
