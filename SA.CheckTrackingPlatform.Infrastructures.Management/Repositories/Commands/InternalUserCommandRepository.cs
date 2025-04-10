using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Commands
{
    public class InternalUserCommandRepository : CommandRepository<InternalUser>, IInternalUserCommandRepository
    {
        #region Constructors

        public InternalUserCommandRepository(ApplicationContext context) : base(context)
        {
        }

        #endregion Constructors
    }
}