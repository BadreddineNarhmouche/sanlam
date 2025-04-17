
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Status 
    {
        #region Constructors

        public Status() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Timeline> Timelines { get; set; }


        #endregion Properties
    }
}
