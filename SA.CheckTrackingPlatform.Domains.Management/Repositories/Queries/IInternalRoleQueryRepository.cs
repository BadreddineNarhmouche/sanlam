using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IInternalRoleQueryRepository : IQueryRepository<InternalRole>
    {
        #region Methods

        Task<InternalRole> GetByCodeAsync(string code);

        Task<InternalRole> GetByIdAsync(int id);

        Task<IEnumerable<InternalRole>> GetAllAsync();

        #endregion Methods
    }
}