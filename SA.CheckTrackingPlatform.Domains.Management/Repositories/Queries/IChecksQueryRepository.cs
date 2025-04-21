using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SA.CheckTrackingPlatform.Domains.Common;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    public interface IChecksQueryRepository : IQueryRepository<Checks>
    {
        #region Methods
        Task<Checks> GetByIdAsync(int id);
        #endregion Methods
    }
}
