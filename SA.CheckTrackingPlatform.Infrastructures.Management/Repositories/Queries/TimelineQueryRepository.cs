using Microsoft.EntityFrameworkCore;
using PdfSharpCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class TimelineQueryRepository : QueryRepository<Timeline>, ITimelinesQueryRepository
    {
        #region Fields 
        protected readonly ApplicationContext applicationContext;
        #endregion Fields


        #region Constructors 
        public TimelineQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }
        #endregion Constructors


        #region Methods

        public async Task<Timeline> GetTimelineByIdAsync(int id)
        {
            Timeline query = await this.applicationContext.Timelines // dbset implementation
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

            if (!string.IsNullOrWhiteSpace(reasonlabel))
                query = query.Where(c => c.ReasonLabel == reasonlabel);


            if (pageIndex.HasValue && pageSize.HasValue)
            {
                int skip = pageIndex.Value * pageSize.Value;
                query = query.Skip(skip).Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }
        #endregion Methods
    }
}
