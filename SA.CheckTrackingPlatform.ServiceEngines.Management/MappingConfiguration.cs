using AutoMapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines;

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