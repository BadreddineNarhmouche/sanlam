using SA.CheckTrackingPlatform.Domains.Management.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    [Table("Checkes", Schema = "core")]
    public class Checkes : BaseEntity<int>
    {
        #region Constructors

        public Checkes() : base()
        {
        }

        #endregion Constructors

        #region Properties


        #endregion Properties
    }
}
