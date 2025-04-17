
namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Timeline
    {
        #region Constructors

        public Timeline() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public int CheckId { get; set; }
        public int StatusId { get; set; }
        public DateTime CreationDate { get; set; }
        public string ReasonLabel { get; set; }
        public virtual string CreatedById { get; set; }

        // Navigation properties
        public Checkes Check { get; set; }
        public Status Status { get; set; }



        #endregion Properties
    }
}
