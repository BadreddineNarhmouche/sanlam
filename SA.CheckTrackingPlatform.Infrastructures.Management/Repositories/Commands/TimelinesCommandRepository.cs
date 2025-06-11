using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Commands
{
    public class TimelinesCommandRepository : CommandRepository<Timeline>, ITimelinesCommandRepository
    {
        #region Constructors

        public TimelinesCommandRepository(ApplicationContext context) : base(context)
        {
        }

        #endregion Constructors
    }
}