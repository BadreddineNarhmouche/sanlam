using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using SA.CheckTrackingPlatform.Domains.Management.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Contexts.Management.Application
{
    public class ApplicationContext : DbContext
    {
        #region Fields

        protected readonly IConfiguration configuration;

        #endregion Fields

        #region Constructors

        public ApplicationContext()
        {
        }

        public ApplicationContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        #endregion Constructors

        #region Overrided methods

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.UseSqlServer(this.configuration.GetConnectionString("ApplicationDatabase"));
        }

        public override int SaveChanges()
        {
            HandleChangeTracking();

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            HandleChangeTracking();

            return base.SaveChangesAsync(cancellationToken);
        }

        private void HandleChangeTracking()
        {
            foreach (EntityEntry<IBaseEntity> entityEntry in ChangeTracker.Entries<IBaseEntity>())
            {
                if (entityEntry.State == EntityState.Added)
                {
                    entityEntry.Entity.CreationDate = DateTime.Now;
                }
                else if (entityEntry.State == EntityState.Modified)
                {
                    entityEntry.Entity.ModificationDate = DateTime.Now;
                }

                if (entityEntry.Entity.IsDeactivated)
                {
                    entityEntry.Entity.DeactivationDate = DateTime.Now;
                }
                else if (entityEntry.Entity.IsDeleted)
                {
                    entityEntry.Entity.DeletionDate = DateTime.Now;
                }
            }
        }

        #endregion Overrided methods       

        #region DbSets
        public DbSet<Checkes> Checkes { get; set; }
        public DbSet<InternalRole> InternalRoles { get; set; }
        public DbSet<InternalUser> InternalUsers { get; set; }
        public DbSet<InternalUserBranchPartner> InternalUserBranchPartners { get; set; }
        public DbSet<InternalUserInternalRole> InternalUserInternalRoles { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }

        #endregion DbSets
    }
}