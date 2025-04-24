using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface INotificationQueryRepository : IQueryRepository<Notification>
    {
        #region Methods

        Task<Notification> GetByIdAsync(int id);

        Task<IEnumerable<Notification>> GetAllByCriteriaAsync(int? internalUserId, int? notificationTypeId,
            DateTime? fromCreationDate, DateTime? toCreationDate, int? isSeen,
            int? internalRoleId, long? deliverySlipId, long? quittanceId,
            int? pageIndex, int? pageSize);

        Task<int> CountAllByCriteriaAsync(int? internalUserId, int? notificationTypeId,
            DateTime? fromCreationDate, DateTime? toCreationDate, int? isSeen,
            int? internalRoleId, long? deliverySlipId, long? quittanceId);

        #endregion Methods
    }
}