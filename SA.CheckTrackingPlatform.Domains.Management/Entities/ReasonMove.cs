using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class ReasonMove
    {
        #region Constructors

        public ReasonMove() : base()
        {
        }

        #endregion Constructors

        #region Properties

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; protected set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion Properties
    }
}
