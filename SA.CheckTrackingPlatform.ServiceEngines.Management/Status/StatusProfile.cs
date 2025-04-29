using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder
{
    public class StatusProfile : Profile
    {
        #region Constructors 

        public StatusProfile()
        {
            CreateMap<Status, GetStatusByIdResponse>().ReverseMap();

            CreateMap<Status, GetStatusByAllItem>().ReverseMap();
        }

        #endregion Constructors
    }
}
