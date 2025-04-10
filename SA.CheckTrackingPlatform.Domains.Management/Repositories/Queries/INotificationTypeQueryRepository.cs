using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface INotificationTypeQueryRepository : IQueryRepository<NotificationType>
    {
        #region Methods

        Task<NotificationType> GetByCodeAsync(string code);

        Task<IEnumerable<NotificationType>> GetAllAsync();

        #endregion Methods
    }
}