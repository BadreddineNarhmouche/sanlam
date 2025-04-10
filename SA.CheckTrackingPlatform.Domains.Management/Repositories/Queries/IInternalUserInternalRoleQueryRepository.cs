using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IInternalUserInternalRoleQueryRepository : IQueryRepository<InternalUserInternalRole>
    {
        #region Methods

        Task<IEnumerable<InternalUserInternalRole>> GetAllByInternalUserIdAsync(int internalUserId, bool? isDeactivated);

        Task<IEnumerable<InternalUserInternalRole>> GetAllByCriteriaAsync(int? internalRoleId, int? internalUserId);

        Task<IEnumerable<InternalUserInternalRole>> GetAllByInternalUserElectronicAddressAsync(string internalUserElectronicAddress);

        Task<bool> ExistByCriteriaAsync(string internalUserElectronicAddress, string internalRoleCode);

        #endregion Methods
    }
}