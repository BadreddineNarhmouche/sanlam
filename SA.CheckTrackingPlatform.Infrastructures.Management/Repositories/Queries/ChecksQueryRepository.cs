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
                .Include(c => c.Timelines)
                .ThenInclude(c => c.Status)
                .Include(c => c.Timelines)
                .ThenInclude(c => c.User)
                .Include(c => c.Timelines)
                .ThenInclude(c => c.ReasonMove)
                .Include(c => c.Branch)
                .Include(c => c.Service)
                .Include(c => c.Bank)
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            query.Timelines = query.Timelines
                 .OrderByDescending(t => t.CreationDate)
                 .ToList();

            return query;
        }
        public async Task<IEnumerable<Checks>> GetByCriteriaAsync(string? checkNumbers, string? lotNumber, string? SinisterNumber, int? StatusId, int? pageIndex, int? pageSize, int? serviceId)
        {
            IQueryable<Checks> query = this.applicationContext.Checks
                .Include(c => c.Timelines)
                .ThenInclude(c => c.Status)
                .Include(c => c.Branch)
                .Include(c => c.Service)
                .Include(c => c.Bank);

            if (checkNumbers != null && checkNumbers.Any())
                query = query.Where(c => checkNumbers.Contains(c.CheckNumber));

            if (!string.IsNullOrWhiteSpace(lotNumber))
                query = query.Where(c => c.LotNumber == lotNumber);

            if (!string.IsNullOrWhiteSpace(SinisterNumber))
                query = query.Where(c => c.SinisterNumber == SinisterNumber);

            if (StatusId.IsNotNull())
                query = query.Where(c => c.Timelines.Where(t =>
                   t.Status.Id == StatusId && t.DateOfPassage == applicationContext.Timelines.Where(t2 => t2.CheckId == c.Id).Max(t2 => t2.DateOfPassage)
               ).OrderByDescending(q => q.CreationDate).Any());

            if (serviceId.IsNotNull())
                query = query.Where(c => c.ServiceId == serviceId);

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
                query = query.Where(c => c.Timelines.Where(t =>
                    t.Status.Code == Status && t.DateOfPassage == applicationContext.Timelines.Where(t2 => t2.CheckId == c.Id).Max(t2 => t2.DateOfPassage)
                ).OrderByDescending(q => q.CreationDate).Any());

            return await query
                 .AsNoTrackingWithIdentityResolution()
                 .ToListAsync();
        }

        public async Task<int> CountAllByCriteriaAsync(string? checkNumbers, string? lotNumber, string? SinisterNumber, int? StatusId, int? serviceId)
        {
            IQueryable<Checks> query = this.applicationContext.Checks
               .Include(c => c.Timelines)
               .ThenInclude(c => c.Status)
               .Include(c => c.Branch)
               .Include(c => c.Service)
               .Include(c => c.Bank);

            if (checkNumbers != null && checkNumbers.Any())
                query = query.Where(c => checkNumbers.Contains(c.CheckNumber));

            if (!string.IsNullOrWhiteSpace(lotNumber))
                query = query.Where(c => c.LotNumber == lotNumber);

            if (!string.IsNullOrWhiteSpace(SinisterNumber))
                query = query.Where(c => c.SinisterNumber == SinisterNumber);

            if (StatusId.IsNotNull())
                query = query.Where(c => c.Timelines.Where(t =>
                   t.Status.Id == StatusId && t.DateOfPassage == applicationContext.Timelines.Where(t2 => t2.CheckId == c.Id).Max(t2 => t2.DateOfPassage)
               ).OrderByDescending(q => q.CreationDate).Any());

            if (serviceId.IsNotNull())
                query = query.Where(c => c.ServiceId == serviceId);

            return await query
                 .AsNoTrackingWithIdentityResolution()
                .CountAsync();
        }

        #endregion
    }
}