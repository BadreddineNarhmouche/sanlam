using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SA.CheckTrackingPlatform.Domains.Management.Common
{
    public abstract class BaseEntity<TId> : IBaseEntity where TId : struct
    {
        #region Constructors

        protected BaseEntity()
        {
        }

        #endregion Constructors

        #region Properties

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual TId Id { get; protected set; }

        public virtual DateTime CreationDate { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(CoreConstants.StringLengths.Id)]
        public virtual string CreatedById { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(CoreConstants.StringLengths.FullName)]
        public virtual string CreatedByFullName { get; set; }

        public virtual DateTime? ModificationDate { get; set; }

        [StringLength(CoreConstants.StringLengths.Id)]
        public virtual string? ModifiedById { get; set; }

        [StringLength(CoreConstants.StringLengths.FullName)]
        public virtual string? ModifiedByFullName { get; set; }

        public virtual int IsDeactivated { get; set; }

        public virtual DateTime? DeactivationDate { get; set; }

        [StringLength(CoreConstants.StringLengths.Id)]
        public virtual string? DeactivatedById { get; set; }

        [StringLength(CoreConstants.StringLengths.FullName)]
        public virtual string? DeactivatedByFullName { get; set; }

        public virtual int IsDeleted { get; set; }

        public virtual DateTime? DeletionDate { get; set; }

        [StringLength(CoreConstants.StringLengths.Id)]
        public virtual string? DeletedById { get; set; }

        [StringLength(CoreConstants.StringLengths.FullName)]
        public virtual string? DeletedByFullName { get; set; }

        #endregion Properties

        #region Overrided methods

        public override bool Equals(object? obj)
        {
            if (this.IsNull() || obj.IsNull())
            {
                return false;
            }

            if (this.GetType() != obj.GetType())
            {
                return false;
            }

            if (obj is not BaseEntity<TId> other)
            {
                return false;
            }

            if (ReferenceEquals(this, other))
            {
                return true;
            }

            if (this.Id.Equals(default) || other.Id.Equals(default))
            {
                return false;
            }

            return Id.Equals(other.Id);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hashCode = 41 * 59 + base.GetHashCode();

                if (this.Id.IsNotNull() && !this.Id.Equals(default))
                {
                    hashCode = hashCode * 59 + this.Id.GetHashCode();
                }
                if (!this.CreationDate.Equals(default))
                {
                    hashCode = hashCode * 59 + this.CreationDate.GetHashCode();
                }
                if (this.ModificationDate.HasValue)
                {
                    hashCode = hashCode * 59 + this.ModificationDate.GetHashCode();
                }
                if (this.DeactivationDate.HasValue)
                {
                    hashCode = hashCode * 59 + this.DeactivationDate.GetHashCode();
                }
                if (this.DeletionDate.HasValue)
                {
                    hashCode = hashCode * 59 + this.DeletionDate.GetHashCode();
                }

                return hashCode * 59;
            }
        }

        #endregion Overrided methods

        #region Operators

        public static bool operator ==(BaseEntity<TId> left, BaseEntity<TId> right)
        {
            if (left.IsNull() && right.IsNull())
                return true;

            if (left.IsNull() || right.IsNull())
                return false;

            return left.Equals(right);
        }

        public static bool operator !=(BaseEntity<TId> left, BaseEntity<TId> right)
        {
            return !(left == right);
        }

        #endregion Operators
    }
}