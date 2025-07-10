using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IReasonMovesQueryRepository : IQueryRepository<ReasonMove>
    {
        #region Methods 
        Task<ReasonMove> GetReasonMoveByIdAsync(int id);
        Task<IEnumerable<ReasonMove>> GetAllReasonMovesAsync(string to = "RE");
        #endregion Methods
    }
}
