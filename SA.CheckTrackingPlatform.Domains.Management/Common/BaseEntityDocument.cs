using System.ComponentModel.DataAnnotations;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Domains.Management.Common
{
    public abstract class BaseEntityDocument<TId> : BaseEntity<long>
    {
        #region Constructors

        protected BaseEntityDocument()
        {
        }

        #endregion Constructors

        #region Properties

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.DocumentName)]
        public virtual string Name { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.DocumentPath)]
        public virtual string Path { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(StringLengths.DocumentContentType)]
        public virtual string ContentType { get; set; }

        public virtual float Size { get; set; }

        #endregion Properties
    }
}