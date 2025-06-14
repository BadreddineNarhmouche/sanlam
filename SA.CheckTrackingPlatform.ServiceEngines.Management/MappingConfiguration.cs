using AutoMapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder;
using SA.CheckTrackingPlatform.ServiceEngines.Management.ReasonsMoves;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper
{
    public static class MappingConfiguration
    {
        #region Fields

        private static readonly Lazy<IMapper> lazyMapper = new Lazy<IMapper>(() =>
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(mc =>
            {
                mc.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsAssembly;

                mc.AddProfile<InternalRoleProfile>();
                mc.AddProfile<InternalUserInternalRoleProfile>();
                mc.AddProfile<InternalUserProfile>();
                mc.AddProfile<NotificationProfile>();
                mc.AddProfile<ChecksProfile>();  
                mc.AddProfile<TimelineProfile>();
                mc.AddProfile<StatusProfile>(); 
                mc.AddProfile<BanksProfile>();  
                mc.AddProfile<BranchsProfile>();   
             //   mc.AddProfile<ReasonMoveProfile>();  
            });

            IMapper iMapper = mapperConfiguration.CreateMapper();

            return iMapper;
        });

        #endregion Fields

        #region Properties

        public static IMapper Mapper => lazyMapper.Value;

        #endregion Properties 
    }
}