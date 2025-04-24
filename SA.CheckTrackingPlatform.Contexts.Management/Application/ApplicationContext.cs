using Microsoft.Extensions.Configuration;
using SA.CheckTrackingPlatform.Domains.Management.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using Oracle.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;

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


        public ApplicationContext(IConfiguration configuration, DbContextOptions<ApplicationContext> options) : base(options)
        {
            this.configuration = configuration;
        }

        #endregion Constructors

        #region Overrided methods

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseOracle(this.configuration.GetConnectionString("OracleDatabase"));
            }
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

                if (entityEntry.Entity.IsDeactivated == 1)
                {
                    entityEntry.Entity.DeactivationDate = DateTime.Now;
                }
                else if (entityEntry.Entity.IsDeleted == 1)
                {
                    entityEntry.Entity.DeletionDate = DateTime.Now;
                }
            }
        }

        #endregion Overrided methods       

        #region DbSets
        public DbSet<Checks> Checks { get; set; }
        public DbSet<InternalRole> InternalRoles { get; set; }
        public DbSet<InternalUser> InternalUsers { get; set; }
        public DbSet<InternalUserInternalRole> InternalUserInternalRoles { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branchs { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Timeline> Timelines { get; set; }

        #endregion DbSets
    }
}