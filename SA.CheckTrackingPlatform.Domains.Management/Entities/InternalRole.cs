
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class InternalRole
    {
        #region Constructors

        public InternalRole() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public virtual string Code { get; set; }
        public virtual string Label { get; set; }

        #endregion Properties
    }
}