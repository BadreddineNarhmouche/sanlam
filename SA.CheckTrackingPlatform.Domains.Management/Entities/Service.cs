
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Service
    {
        #region Constructors

        public Service() : base()
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
