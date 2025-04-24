namespace SA.CheckTrackingPlatform.Domains.Management.Common
{
    public interface IBaseEntity
    {
        #region Properties

        public DateTime CreationDate { get; set; }

        public string CreatedById { get; set; }

        public string CreatedByFullName { get; set; }

        public DateTime? ModificationDate { get; set; }

        public string? ModifiedById { get; set; }

        public string? ModifiedByFullName { get; set; }

        public int IsDeactivated { get; set; }

        public DateTime? DeactivationDate { get; set; }

        public string? DeactivatedById { get; set; }

        public string? DeactivatedByFullName { get; set; }

        public int IsDeleted { get; set; }

        public DateTime? DeletionDate { get; set; }

        public string? DeletedById { get; set; }

        public string? DeletedByFullName { get; set; }

        #endregion Properties
    }
}