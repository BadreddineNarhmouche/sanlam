using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes
{
    public class ChecksProfile : Profile
    {
        #region Constructors 

        public ChecksProfile()
        {
            CreateMap<Checks, GetChecksByIdResponse>()
                .ForMember(destination => destination.ServiceName, option => option.MapFrom(source => source.Service.Label))
                .ForMember(destination => destination.BankName, option => option.MapFrom(source => source.Bank.Label))
                .ForMember(destination => destination.BranchName, option => option.MapFrom(source => source.Branch.Label))
                .ReverseMap();

            CreateMap<Checks, GetAllByCriteriaItem>()
                .ForMember(destination => destination.ServiceName, option => option.MapFrom(source => source.Service.Label))
                .ReverseMap();

            CreateMap<Timeline, TimelineItems>()
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
             .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.CreationDate))
             .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
             .ForMember(dest => dest.StatusItems, opt => opt.MapFrom(src => src.Status))
             .ForMember(dest => dest.InternalUserItem, opt => opt.MapFrom(src => src.User))
             .ForMember(dest => dest.ReasonMoveItems, opt => opt.MapFrom(src => src.ReasonMove))
             .ReverseMap();

            CreateMap<Status, StatusItems>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.Code))
                .ReverseMap();

            CreateMap<InternalUser, InternalUserItems>()
                 .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                 .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                 .ReverseMap();

            CreateMap<Checks, GetAllItem>().ReverseMap();
           
            CreateMap<ReasonMove, ReasonMoveItems>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
               .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.Code))
               .ReverseMap();

        }
        #endregion Constructors
    }
}
