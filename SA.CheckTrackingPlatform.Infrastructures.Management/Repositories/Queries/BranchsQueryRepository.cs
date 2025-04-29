using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class BranchsQueryRepository : QueryRepository<Branch>, IBranchsQueryRepository
    {
        #region Fields 

        protected readonly ApplicationContext applicationContext;

        #endregion Fields 

        #region Constructors 

        public BranchsQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods 

        public async Task<Branch> GetByIdAsync(int id)
        {
            Branch query = await this.applicationContext.Branchs
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Branch>> GetByAllAsync()
        {
            return await Task.Run(async () =>
            {
                IEnumerable<Branch> query = await this.applicationContext.Branchs
                 .AsNoTrackingWithIdentityResolution()
                 .ToListAsync();

                return query;
            });
        }
        #endregion
    }
}