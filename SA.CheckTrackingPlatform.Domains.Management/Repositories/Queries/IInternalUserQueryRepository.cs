using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IInternalUserQueryRepository : IQueryRepository<InternalUser>
    {
        #region Methods

        Task<InternalUser> GetByIdAsync(int id);

        Task<IEnumerable<InternalUser>> GetAllByCriteriaAsync(string? firstName, string? lastName, string? electronicAddress, string? internalRoleCode, DateTime? fromCreationDate, DateTime? toCreationDate);

        Task<InternalUser> GetByElectronicAddressAsync(string electronicAddress);

        Task<bool> ExistByElectronicAddressAsync(string electronicAddress);

        #endregion Methods
    }
}