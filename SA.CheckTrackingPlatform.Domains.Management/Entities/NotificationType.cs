
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class NotificationType
    {
        #region Constructors

        public NotificationType() : base()
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