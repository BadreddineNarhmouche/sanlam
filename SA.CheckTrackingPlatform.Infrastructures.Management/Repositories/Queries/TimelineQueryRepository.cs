using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

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

        #endregion Methods

    }
}
