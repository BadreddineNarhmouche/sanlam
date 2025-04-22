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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure entity relationships, constraints, etc.
            modelBuilder.Entity<Checks>()
                .HasOne(o => o.Service)
                .WithMany()
                .HasForeignKey(o => o.ServiceId);

            modelBuilder.Entity<Checks>()
             .HasOne(o => o.Branch)
             .WithMany()
             .HasForeignKey(o => o.BranchId);

            modelBuilder.Entity<Checks>()
             .HasOne(o => o.Bank)
             .WithMany()
             .HasForeignKey(o => o.BankId);

            modelBuilder.Entity<Timeline>()
             .HasOne(o => o.Status)
             .WithMany()
             .HasForeignKey(o => o.StatusId);

            modelBuilder.Entity<Timeline>()
                .Property(c => c.Id)
                .HasDefaultValueSql("CustomerSequence.NEXTVAL");
        }


        //protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        //{
        //    dbContextOptionsBuilder.UseSqlServer(this.configuration.GetConnectionString("ApplicationDatabase"));
        //}

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
        public DbSet<Checks> Checkes { get; set; }
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