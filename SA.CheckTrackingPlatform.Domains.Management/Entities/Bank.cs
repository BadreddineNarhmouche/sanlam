using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("Bank", Schema = "core")]
    public class Bank : BaseEntity<int>
    {
        #region Constructors

        public Bank() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Checkes> Checks { get; set; }


        #endregion Properties
    }
}
