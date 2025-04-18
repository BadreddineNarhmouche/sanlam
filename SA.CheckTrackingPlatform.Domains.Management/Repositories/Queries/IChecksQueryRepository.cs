using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries
{
    internal interface IChecksQueryRepository
    {
        #region Methods
        Task<Checks> GetByIdAsync(int id);
        #endregion Methods
    }
}
