using Microsoft.EntityFrameworkCore;
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
    public class ReasonMovesQueryRepository : QueryRepository<Status>, IReasonMovesQueryRepository
    {
        #region Fields

        protected readonly ApplicationContext applicationContext;

        #endregion Fields

        #region Constructors
        public ReasonMovesQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods
        public async Task<ReasonMove> GetReasonMoveByIdAsync(int id)
        {
            ReasonMove query = await this.applicationContext.ReasonMoves
                .AsNoTrackingWithIdentityResolution()
                .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<ReasonMove>> GetAllReasonMovesAsync()
        {
            return await Task.Run(async () =>
            {
                IEnumerable<ReasonMove> query = await this.applicationContext.ReasonMoves
                 .AsNoTrackingWithIdentityResolution()
                 .ToListAsync();

                return query;
            });
        }
        #endregion Methods
    }
}
