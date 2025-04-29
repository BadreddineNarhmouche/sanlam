using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class BanksQueryRepository : QueryRepository<Bank>, IBanksQueryRepository
    {
        #region Fields 

        protected readonly ApplicationContext applicationContext;

        #endregion Fields 

        #region Constructors 

        public BanksQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods 

        public async Task<Bank> GetByIdAsync(int id)
        {
            Bank query = await this.applicationContext.Banks
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Bank>> GetByAllAsync()
        {
            return await Task.Run(async () =>
            {
                IEnumerable<Bank> query = await this.applicationContext.Banks
                 .AsNoTrackingWithIdentityResolution()
                 .ToListAsync();

                return query;
            });
        }
        #endregion
    }
}