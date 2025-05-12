using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using System.Threading.Tasks;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses;

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
         
            CreateMap<Timeline, TimelineItems>()
              .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.Id))
              .ForMember(dest => dest.StatusItems, opt => opt.MapFrom(src => src.Status)).ReverseMap();

            CreateMap<Status, StatusItems>()
                .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.Id)).ReverseMap();

            #endregion Constructors
        }
    }
}
