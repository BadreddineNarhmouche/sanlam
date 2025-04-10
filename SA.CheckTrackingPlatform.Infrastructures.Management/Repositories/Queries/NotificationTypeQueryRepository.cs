using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class NotificationTypeQueryRepository : QueryRepository<NotificationType>, INotificationTypeQueryRepository
    {
        #region Fields

        protected readonly ApplicationContext applicationContext;

        #endregion Fields

        #region Constructors

        public NotificationTypeQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods

        public async Task<NotificationType> GetByCodeAsync(string code)
        {
            NotificationType query = await this.applicationContext.NotificationTypes
                .AsNoTrackingWithIdentityResolution()
                .FirstAsync(o => o.Code == code);

            return query;
        }

        public async Task<IEnumerable<NotificationType>> GetAllAsync()
        {
            return await this.applicationContext.NotificationTypes
                    .AsNoTrackingWithIdentityResolution()
                    .ToListAsync();
        }

        #endregion Methods
    }
}