using AutoMapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes
{
    public class ChecksProfile : Profile
    {
        #region Constructors 

        public ChecksProfile()
        {
            CreateMap<Checks, GetChecksByIdResponse>().ReverseMap();
            CreateMap<Checks, GetAllByCriteriaItem>()
                .ForMember(destination => destination.ServiceName, option => option.MapFrom(source => source.Service.Label))
                .ReverseMap();

            CreateMap<Checks, GetAllItem>().ReverseMap();
        }

        #endregion Constructors
    }
}
