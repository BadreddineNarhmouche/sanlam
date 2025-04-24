
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SA.CheckTrackingPlatform.Domains.Management.Common;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Bank
    {
        #region Constructors

        public Bank() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual short Id { get; protected set; }
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Checks> Checks { get; set; }

        #endregion Properties
    }
}
