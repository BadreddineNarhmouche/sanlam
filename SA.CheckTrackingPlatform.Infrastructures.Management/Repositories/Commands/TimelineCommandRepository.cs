using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Commands
{
    public class TimelineCommandRepository : CommandRepository<Timeline> , ITimelineCommandRepository
    {
        #region Constructors 

        public TimelineCommandRepository(ApplicationContext context) : base(context)
        {

        }
        #endregion Constructors
    }
}
