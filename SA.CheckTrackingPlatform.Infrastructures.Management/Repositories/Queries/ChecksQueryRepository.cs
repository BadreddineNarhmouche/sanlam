using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using static SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.FileExcel.FileExcelQuery;

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
                .Include(c => c.Timelines)
                // timeline contient objet de cheques ne doit pas le contenir
                .ThenInclude(c => c.Status) // Linq
                .Include(c => c.Timelines)
                .ThenInclude(c => c.User)
                .Include(c => c.Timelines)
                .ThenInclude(c => c.ReasonMove)
                .Include(c => c.Branch)
                .Include(c => c.Service)
                .Include(c => c.Bank)
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            // query.Timelines.OrderByDescending(t => t.CreationDate);
            query.Timelines = query.Timelines
                 .OrderByDescending(t => t.CreationDate)
                 .ToList();

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

        public async Task<IEnumerable<Checks>> GetAllAsync(string? checkNumbers, string? lotNumber, string? SinisterNumber, string? Status)
        {
            IQueryable<Checks> query = this.applicationContext.Checks
                .Include(c => c.Timelines)
                .ThenInclude(c => c.Status);

            if (!string.IsNullOrWhiteSpace(checkNumbers))
                query = query.Where(c => checkNumbers.Contains(c.CheckNumber));


            if (!string.IsNullOrWhiteSpace(lotNumber))
                query = query.Where(c => c.LotNumber == lotNumber);

            if (!string.IsNullOrWhiteSpace(SinisterNumber))
                query = query.Where(c => c.SinisterNumber.Contains(SinisterNumber));

            if (!string.IsNullOrWhiteSpace(Status))
                query = query.Where(c => c.Timelines.Where(t => t.Status.Code == Status).OrderByDescending(q => q.CreationDate).Any());

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

        public async Task<IEnumerable<Checks>> GetChecksWithLatestStatusAsync()
        {
            var result = await (
                from c in applicationContext.Checks
                join t in applicationContext.Timelines on c.Id equals t.CheckId
                join s in applicationContext.Statuses on t.StatusId equals s.Id
                where t.DateOfPassage == applicationContext.Timelines
                    .Where(t2 => t2.CheckId == c.Id)
                    .Max(t2 => t2.DateOfPassage)
                select c
            ).ToListAsync();

            return result;
        }
        public async Task<Dictionary<string, int>> GetChecksWithLatestStatusGroupedByStatusAsync()
        {
            var latestTimelines = await (
                from c in applicationContext.Checks
                join t in applicationContext.Timelines on c.Id equals t.CheckId
                join s in applicationContext.Statuses on t.StatusId equals s.Id
                where t.DateOfPassage == applicationContext.Timelines
                    .Where(t2 => t2.CheckId == c.Id)
                    .Max(t2 => t2.DateOfPassage)
                select new
                {
                    StatusLabel = s.Label.Trim().ToLowerInvariant()
                }
            ).ToListAsync();

            return latestTimelines
                .GroupBy(x => x.StatusLabel)
                .ToDictionary(g => g.Key, g => g.Count());
        }

        public async Task<IEnumerable<KPIItemShow>> GetChecksWithLatestStatusGroupedByStatusAsync(string statusCode)
        {
            string normalizedStatusCode = statusCode.Trim().ToLower();

            return await applicationContext.Checks
                .Join(
                    applicationContext.Timelines,
                    c => c.Id,
                    t => t.CheckId,
                    (c, t) => new { Check = c, Timeline = t }
                )
                .Join(
                    applicationContext.Statuses,
                    ct => ct.Timeline.StatusId,
                    s => s.Id,
                    (ct, s) => new { ct.Check, ct.Timeline, Status = s }
                )
                .Where(x =>
                    x.Timeline.DateOfPassage ==
                        applicationContext.Timelines
                            .Where(t2 => t2.CheckId == x.Check.Id)
                            .Max(t2 => t2.DateOfPassage)
                    &&
                    x.Status.Label.Trim().ToLower() == normalizedStatusCode
                )
                .Select(x => new KPIItemShow
                {
                    AmountRef = x.Check.Amount,
                    CheckNumberRef = x.Check.CheckNumber,
                    LotNumberRef = x.Check.LotNumber,
                    RecipientNameRef = x.Check.RecipientName,
                    BeneficiaryNameRef = x.Check.BeneficiaryName,
                    CreationDateRef = x.Check.CreationDate.ToShortDateString()
                })
                .AsNoTracking()
                .ToListAsync();
        }

        #endregion
    }
}