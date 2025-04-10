using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Commands
{
    public class InternalRoleCommandRepository : CommandRepository<InternalRole>, IInternalRoleCommandRepository
    {
        #region Constructors

        public InternalRoleCommandRepository(ApplicationContext context) : base(context)
        {
        }

        #endregion Constructors
    }
}