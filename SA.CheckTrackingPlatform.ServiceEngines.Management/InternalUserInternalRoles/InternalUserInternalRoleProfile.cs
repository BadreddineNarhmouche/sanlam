using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses;
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper
{
    public class InternalUserInternalRoleProfile : Profile
    {
        #region Constructors

        public InternalUserInternalRoleProfile()
        {
            CreateMap<GetAllInternalUserInternalRolesByCriteriaItem, InternalUserInternalRole>().ReverseMap();
            CreateMap<GetAllInternalUserInternalRolesByInternalUserElectronicAddressItem, InternalUserInternalRole>().ReverseMap();
            CreateMap<GetAllInternalUserInternalRolesByInternalUserIdItem, InternalUserInternalRole>().ReverseMap();
        }

        #endregion Constructors
    }
}