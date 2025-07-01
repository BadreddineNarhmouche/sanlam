using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IChecksQueryRepository : IQueryRepository<Checks>
    {
        #region Methods

        Task<Checks> GetByIdAsync(int id);

        Task<IEnumerable<Checks>> GetByCriteriaAsync(string? checkNumbers, string? lotNumber, string? SinisterNumber, int? StatusId, int? pageIndex, int? pageSize);

        Task<IEnumerable<Checks>> GetAllAsync(string? checkNumbers, string? lotNumber, string? SinisterNumber, string? Status);

        Task<int> CountAllByCriteriaAsync(string? checkNumbers, string? lotNumber, string? SinisterNumber, int? StatusId);

        #endregion Methods
    }
}
