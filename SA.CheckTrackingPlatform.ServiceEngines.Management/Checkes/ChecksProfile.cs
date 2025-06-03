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
            CreateMap<Checks, GetChecksByIdResponse>()
                .ForMember(destination => destination.ServiceName, option => option.MapFrom(source => source.Service.Label))
                .ForMember(destination => destination.BankName, option => option.MapFrom(source => source.Bank.Label))
                .ForMember(destination => destination.BranchName, option => option.MapFrom(source => source.Branch.Label))
                .ReverseMap();

            CreateMap<Checks, GetAllByCriteriaItem>()
                .ForMember(destination => destination.ServiceName, option => option.MapFrom(source => source.Service.Label))
                .ReverseMap();

            CreateMap<Checks, GetAllItem>()
              .ForMember(destination => destination.ServiceName, option => option.MapFrom(source => source.Service.Label))
              .ReverseMap();


        }
        #endregion Constructors
    }
}
