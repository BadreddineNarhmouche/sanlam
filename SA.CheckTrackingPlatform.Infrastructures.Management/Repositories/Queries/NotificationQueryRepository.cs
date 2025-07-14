using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class NotificationQueryRepository : QueryRepository<Notification>, INotificationQueryRepository
    {
        #region Fields

        protected readonly ApplicationContext applicationContext;

        #endregion Fields

        #region Constructors

        public NotificationQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods

        public async Task<Notification> GetByIdAsync(int id)
        {
            Notification query = await this.applicationContext.Notifications
                .Include(o => o.NotificationType)
                .AsNoTrackingWithIdentityResolution()
                .FirstAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Notification>> GetAllByCriteriaAsync(int? internalUserId, int? notificationTypeId, DateTime? fromCreationDate, DateTime? toCreationDate, int? isSeen, int? internalRoleId, long? deliverySlipId, long? quittanceId, int? pageIndex, int? pageSize)
        {
            IQueryable<Notification> query = this.applicationContext.Notifications
                .Include(o => o.NotificationType);

            if (internalUserId.IsNotNull() && internalRoleId.IsNotNull())
            {
                query = query
                    .Where(o => o.InternalRoleId == internalRoleId);
            }
            else
            {
                if (internalUserId.IsNotNull())
                {
                    query = query
                        .Where(o => o.InternalUserId == internalUserId);
                }
                if (internalRoleId.IsNotNull())
                {
                    query = query
                        .Where(o => o.InternalRoleId == internalRoleId);
                }
            }

            if (notificationTypeId.IsNotNull())
            {
                query = query
                    .Where(o => o.NotificationTypeId == notificationTypeId);
            }

            if (fromCreationDate.HasValue)
            {
                fromCreationDate = fromCreationDate.Value.From();

                query = query
                    .Where(o => o.CreationDate >= fromCreationDate.Value);
            }

            if (toCreationDate.HasValue)
            {
                toCreationDate = toCreationDate.Value.To();

                query = query
                    .Where(o => o.CreationDate <= toCreationDate.Value);
            }

            if (isSeen.HasValue)
            {
                query = query
                    .Where(o => o.IsSeen == isSeen.Value);
            }

            query = query.OrderByDescending(o => o.CreationDate);

            if (pageIndex.HasValue && pageSize.HasValue)
            {
                query = query.ToPaged(pageIndex.Value, pageSize.Value);
            }

            return await query
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }


        public async Task<int> CountAllByCriteriaAsync(int? internalUserId, int? notificationTypeId, DateTime? fromCreationDate, DateTime? toCreationDate, int? isSeen, int? internalRoleId, long? deliverySlipId, long? quittanceId)
        {
            IQueryable<Notification> query = this.applicationContext.Notifications
                .Include(o => o.NotificationType);

            if (internalUserId.IsNotNull() && internalRoleId.IsNotNull())
            {
                query = query
                    .Where(o => o.InternalRoleId == internalRoleId);
            }
            else
            {
                if (internalUserId.IsNotNull())
                {
                    query = query
                        .Where(o => o.InternalUserId == internalUserId);
                }
                if (internalRoleId.IsNotNull())
                {
                    query = query
                        .Where(o => o.InternalRoleId == internalRoleId);
                }
            }

            if (notificationTypeId.IsNotNull())
            {
                query = query
                    .Where(o => o.NotificationTypeId == notificationTypeId);
            }

            if (fromCreationDate.HasValue)
            {
                fromCreationDate = fromCreationDate.Value.From();

                query = query
                    .Where(o => o.CreationDate >= fromCreationDate.Value);
            }

            if (toCreationDate.HasValue)
            {
                toCreationDate = toCreationDate.Value.To();

                query = query
                    .Where(o => o.CreationDate <= toCreationDate.Value);
            }

            if (isSeen.HasValue)
            {
                query = query
                    .Where(o => o.IsSeen == isSeen.Value);
            }

            return await query
                    .AsNoTrackingWithIdentityResolution()
                    .CountAsync();
        }

        #endregion Methods
    }
}