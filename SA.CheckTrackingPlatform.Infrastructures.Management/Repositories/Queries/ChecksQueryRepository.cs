using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class ChecksQueryRepository : QueryRepository<Checks>, IChecksQueryRepository
    {
        #region Fields 

        protected readonly ApplicationContext applicationContext;

        #endregion Fields 

        #region Constructors 

        public ChecksQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods 

        public async Task<Checks> GetByIdAsync(int id)
        {
            Checks query = await this.applicationContext.Checks
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Checks>> GetByCriteriaAsync(List<int>? ids, List<string>? checkNumbers, int? branchId, int? serviceId, int? bankId, string? lotNumber, string? beneficiaryName, int? pageIndex = null, int? pageSize = null)
        {
            return await Task.Run(async () =>
            {

                List<Checks> checks = new List<Checks>();
                return checks;
            });
        }
        #endregion
    }
}