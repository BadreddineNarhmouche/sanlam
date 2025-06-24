using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using PdfSharpCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class TimelineQueryRepository : QueryRepository<Timeline>, ITimelinesQueryRepository
    {
        #region Fields 
        protected readonly ApplicationContext applicationContext;
        private readonly IConfiguration configuration;

        #endregion Fields


        #region Constructors 
        public TimelineQueryRepository(ApplicationContext applicationContext, IConfiguration configuration) : base()
        {
            this.applicationContext = applicationContext;
            this.configuration = configuration;
        }
        #endregion Constructors


        #region Methods

        public async Task<Timeline> GetTimelineByIdAsync(int id)
        {
            Timeline query = await this.applicationContext.Timelines 
                    .AsNoTrackingWithIdentityResolution()
                    .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Timeline>> GetTimelinesByCriteriaAsync(List<int>? ids, List<int>? ChecksIds, List<int>? UserIds, int? statusId, string? reasonlabel , int? pageIndex = null, int? pageSize = null)
        {
            IQueryable<Timeline> query = this.applicationContext.Timelines
                .AsNoTrackingWithIdentityResolution();


            if (ids != null && ids.Any())
                query = query.Where(c => ids.Contains(c.Id));

            if (ChecksIds != null && ChecksIds.Any())
                query = query.Where(c => ChecksIds.Contains(c.CheckId));

            if (UserIds != null && UserIds.Any())
                query = query.Where(c => UserIds.Contains(c.UserId));

            if (statusId.HasValue)
                query = query.Where(c => c.StatusId == statusId.Value);

            //if (!string.IsNullOrWhiteSpace(reasonlabel))
            //    query = query.Where(c => c.ReasonLabel == reasonlabel);


            if (pageIndex.HasValue && pageSize.HasValue)
            {
                int skip = pageIndex.Value * pageSize.Value;
                query = query.Skip(skip).Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }


        public IQueryable<Timeline> GetKpiQuery(string statutFinal, List<string> statutsExclus)
        {
            return from c in applicationContext.Checks
                   join t in applicationContext.Timelines on c.Id equals t.CheckId
                   join s in applicationContext.Statuses on t.StatusId equals s.Id
                   where s.Label == statutFinal
                         && t.DateOfPassage == applicationContext.Timelines
                             .Where(t2 => t2.CheckId == c.Id)
                             .Max(t2 => t2.DateOfPassage)
                   select t;
        }

        #endregion Methods */
    }
}
