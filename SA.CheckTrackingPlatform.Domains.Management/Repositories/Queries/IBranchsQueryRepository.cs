using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IBranchsQueryRepository : IQueryRepository<Branch>
    {
        #region Methods
        Task<Branch> GetByIdAsync(int id);
        Task<IEnumerable<Branch>> GetByAllAsync();
        #endregion Methods
    }
}
