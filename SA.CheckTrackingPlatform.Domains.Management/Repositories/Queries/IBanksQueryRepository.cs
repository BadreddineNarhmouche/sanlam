using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IBanksQueryRepository : IQueryRepository<Bank>
    {
        #region Methods
        Task<Bank> GetByIdAsync(int id);
        Task<IEnumerable<Bank>> GetByAllAsync();
        #endregion Methods
    }
}
