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
        public async Task<IEnumerable<Checks>> GetByCriteriaAsync(List<int>? ids, List<string>? checkNumbers, int? branchId, int? serviceId, int? bankId, string? lotNumber, string? beneficiaryName, int? pageIndex, int? pageSize)
        {
            // Construire le IQueryable pour ne materialiser qu’une seule fois en base
            IQueryable<Checks> query = this.applicationContext.Checks
                .Include(c => c.Timelines)
                .ThenInclude(c => c.Status)
                .Include(c => c.Branch)
                .Include(c => c.Service)
                .Include(c => c.Bank);

            if (ids != null && ids.Any())
                query = query.Where(c => ids.Contains(c.Id));

            if (checkNumbers != null && checkNumbers.Any())
                query = query.Where(c => checkNumbers.Contains(c.CheckNumber));

            if (branchId.HasValue)
                query = query.Where(c => c.BranchId == branchId.Value);

            if (serviceId.HasValue)
                query = query.Where(c => c.ServiceId == serviceId.Value);

            if (bankId.HasValue)
                query = query.Where(c => c.BankId == bankId.Value);

            if (!string.IsNullOrWhiteSpace(lotNumber))
                query = query.Where(c => c.LotNumber == lotNumber);

            if (!string.IsNullOrWhiteSpace(beneficiaryName))
                query = query.Where(c => c.BeneficiaryName.Contains(beneficiaryName));

            if (pageIndex.HasValue && pageSize.HasValue)
            {
                query = query.ToPaged(pageIndex.Value, pageSize.Value);
            }

            return await query
                 .AsNoTrackingWithIdentityResolution()
                 .ToListAsync();
        }

        public async Task<int> CountAllByCriteriaAsync(List<int>? ids, List<string>? checkNumbers, int? branchId, int? serviceId, int? bankId, string? lotNumber, string? beneficiaryName)
        {
            IQueryable<Checks> query = this.applicationContext.Checks
               .Include(c => c.Timelines)
               .ThenInclude(c => c.Status)
               .Include(c => c.Branch)
               .Include(c => c.Service)
               .Include(c => c.Bank);

            if (ids != null && ids.Any())
                query = query.Where(c => ids.Contains(c.Id));

            if (checkNumbers != null && checkNumbers.Any())
                query = query.Where(c => checkNumbers.Contains(c.CheckNumber));

            if (branchId.HasValue)
                query = query.Where(c => c.BranchId == branchId.Value);

            if (serviceId.HasValue)
                query = query.Where(c => c.ServiceId == serviceId.Value);

            if (bankId.HasValue)
                query = query.Where(c => c.BankId == bankId.Value);

            if (!string.IsNullOrWhiteSpace(lotNumber))
                query = query.Where(c => c.LotNumber == lotNumber);

            if (!string.IsNullOrWhiteSpace(beneficiaryName))
                query = query.Where(c => c.BeneficiaryName.Contains(beneficiaryName));


            return await query
                 .AsNoTrackingWithIdentityResolution()
                .CountAsync();
        }

        #endregion
    }
}