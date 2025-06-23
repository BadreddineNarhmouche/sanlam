using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface ITimelinesQueryRepository : IQueryRepository<Timeline>
    {
        #region Methods
        Task<Timeline> GetTimelineByIdAsync(int id);
        Task<IEnumerable<Timeline>> GetTimelinesByCriteriaAsync(List<int>? ids , List<int>? ChecksIds , List<int>?UserIds , int? statusId , string? reasonlabel , int? pageIndex = null, int? pageSize = null);

        Task<int> GetKpiCountAsync(string statutFinal, List<string> statutsExclus);

        #endregion Methods
    }
}