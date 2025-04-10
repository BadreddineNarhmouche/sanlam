using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class InternalUserQueryRepository : QueryRepository<InternalUser>, IInternalUserQueryRepository
    {
        #region Fields

        protected readonly ApplicationContext applicationContext;

        #endregion Fields

        #region Constructors

        public InternalUserQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods

        public async Task<InternalUser> GetByIdAsync(int id)
        {
            InternalUser query = await this.applicationContext.InternalUsers
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<InternalUser>> GetAllByCriteriaAsync(string? firstName, string? lastName, string? electronicAddress, string? internalRoleCode, DateTime? fromCreationDate, DateTime? toCreationDate)
        {
            IQueryable<InternalUser> query = this.applicationContext.InternalUsers
                .Include(o => o.ParentInternalUser);

            if (!firstName.IsNullOrWhiteSpace())
            {
                firstName = firstName.Trim();

                query = query
                    .Where(o => o.FirstName.Contains(firstName));
            }

            if (!lastName.IsNullOrWhiteSpace())
            {
                lastName = lastName.Trim();

                query = query
                    .Where(o => o.LastName.Contains(lastName));
            }

            if (!electronicAddress.IsNullOrWhiteSpace())
            {
                electronicAddress = electronicAddress.Trim();

                query = query
                    .Where(o => o.ElectronicAddress.Contains(electronicAddress));
            }

            if (fromCreationDate.HasValue)
            {
                fromCreationDate = fromCreationDate.Value.From();

                query = query
                    .Where(o => o.CreationDate >= fromCreationDate.Value);
            }

            if (toCreationDate.HasValue)
            {
                toCreationDate = toCreationDate.Value.To();

                query = query
                    .Where(o => o.CreationDate <= toCreationDate.Value);
            }

            return await query
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<InternalUser> GetByElectronicAddressAsync(string electronicAddress)
        {
            InternalUser query = await this.applicationContext.InternalUsers
                .Include(o => o.InternalUserInternalRoles)
                .ThenInclude(o => o.InternalRole)
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.ElectronicAddress == electronicAddress);

            return query;
        }

        public async Task<bool> ExistByElectronicAddressAsync(string electronicAddress)
        {
            return await this.applicationContext.InternalUsers
                .AsNoTrackingWithIdentityResolution()
                .AnyAsync(o => o.ElectronicAddress == electronicAddress);
        }

        #endregion Methods
    }
}