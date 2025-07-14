using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper
{
    public class InternalUserProfile : Profile
    {
        #region Constructors

        public InternalUserProfile()
        {
            CreateMap<InternalUser, GetInternalUserByIdResponse>().ReverseMap();

            CreateMap<InternalUser, GetAllInternalUsersByCriteriaItem>().ReverseMap();

            CreateMap<InternalUser, GetInternalUserByElectronicAddressResponse>()
                .ReverseMap();
        }

        #endregion Constructors
    }
}