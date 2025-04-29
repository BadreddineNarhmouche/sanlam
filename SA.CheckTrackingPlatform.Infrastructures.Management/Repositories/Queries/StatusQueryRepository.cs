using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class StatusQueryRepository : QueryRepository<Status>, IStatusQueryRepository
    {
        #region Fields 

        protected readonly ApplicationContext applicationContext;

        #endregion Fields 

        #region Constructors 

        public StatusQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods 

        public async Task<Status> GetByIdAsync(int id)
        {
            Status query = await this.applicationContext.Statuses
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Status>> GetByAllAsync()
        {
            return await Task.Run(async () =>
            {
                IEnumerable<Status> query = await this.applicationContext.Statuses
                 .AsNoTrackingWithIdentityResolution()
                 .ToListAsync();

                return query;
            });
        }
        #endregion
    }
}