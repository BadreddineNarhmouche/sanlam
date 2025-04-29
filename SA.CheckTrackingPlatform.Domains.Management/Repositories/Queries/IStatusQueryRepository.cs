using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IStatusQueryRepository : IQueryRepository<Status>
    {
        #region Methods
        Task<Status> GetByIdAsync(int id);
        Task<IEnumerable<Status>> GetByAllAsync();
        #endregion Methods
    }
}
