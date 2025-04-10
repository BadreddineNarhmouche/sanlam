using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class InternalUserInternalRoleQueryRepository : QueryRepository<InternalUserInternalRole>, IInternalUserInternalRoleQueryRepository
    {
        #region Fields

        protected readonly ApplicationContext applicationContext;

        #endregion Fields

        #region Constructors

        public InternalUserInternalRoleQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods
        public async Task<IEnumerable<InternalUserInternalRole>> GetAllByInternalUserIdAsync(int internalUserId, bool? isDeactivated)
        {
            IQueryable<InternalUserInternalRole> query = this.applicationContext.InternalUserInternalRoles
                .Where(o => o.InternalUserId == internalUserId)
                .Include(o => o.InternalRole);

            return await query
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<IEnumerable<InternalUserInternalRole>> GetAllByCriteriaAsync(int? internalRoleId, int? internalUserId)
        {
            IQueryable<InternalUserInternalRole> query = this.applicationContext.InternalUserInternalRoles;

            if (internalRoleId.HasValue)
            {
                query = query
                    .Where(o => o.InternalRoleId == internalRoleId.Value);
            }

            if (internalUserId.HasValue)
            {
                query = query
                    .Where(o => o.InternalUserId == internalUserId.Value);
            }

            return await query
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<IEnumerable<InternalUserInternalRole>> GetAllByInternalUserElectronicAddressAsync(string internalUserElectronicAddress)
        {
            return await this.applicationContext.InternalUserInternalRoles
                .Where(o => o.InternalUser.ElectronicAddress == internalUserElectronicAddress)
                .Include(o => o.InternalRole)
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<bool> ExistByCriteriaAsync(string internalUserElectronicAddress, string internalRoleCode)
        {
            return await this.applicationContext.InternalUserInternalRoles
                .Include(o => o.InternalUser)
                .Include(o => o.InternalRole)
                .AsNoTrackingWithIdentityResolution()
                .AnyAsync(o => o.InternalUser.ElectronicAddress == internalUserElectronicAddress && o.InternalRole.Code == internalRoleCode);
        }

        #endregion Methods
    }
}