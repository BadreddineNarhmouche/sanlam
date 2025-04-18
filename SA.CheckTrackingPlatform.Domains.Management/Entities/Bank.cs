
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

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        // Navigation properties
        public ICollection<Checks> Checks { get; set; }

        #endregion Properties
    }
}
