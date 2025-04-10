using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class InternalRoleQueryRepository : QueryRepository<InternalRole>, IInternalRoleQueryRepository
    {
        #region Fields

        protected readonly ApplicationContext applicationContext;

        #endregion Fields

        #region Constructors

        public InternalRoleQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods

        public async Task<InternalRole> GetByCodeAsync(string code)
        {
            InternalRole query = await this.applicationContext.InternalRoles
                .AsNoTrackingWithIdentityResolution()
                .FirstAsync(o => o.Code == code);

            return query;
        }

        public async Task<InternalRole> GetByIdAsync(int id)
        {
            InternalRole query = await this.applicationContext.InternalRoles
                .AsNoTrackingWithIdentityResolution()
                .FirstAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<InternalRole>> GetAllAsync()
        {
            List<InternalRole> query = await this.applicationContext.InternalRoles
                .AsNoTrackingWithIdentityResolution()
                .OrderBy(o => o.Label)
                .ToListAsync();

            return query;
        }

        #endregion Methods

    }
}