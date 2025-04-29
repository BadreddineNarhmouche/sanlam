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
            CreateMap<Status, GetByIdResponse>().ReverseMap();

            CreateMap<Status, GetByAllItem>().ReverseMap();
        }

        #endregion Constructors
    }
}
