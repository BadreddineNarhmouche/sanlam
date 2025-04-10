using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper
{
    public class InternalRoleProfile : Profile
    {
        #region Constructors

        public InternalRoleProfile()
        {
            CreateMap<InternalRole, GetInternalRoleByCodeResponse>().ReverseMap();

            CreateMap<InternalRole, GetAllInternalRolesResponse>().ReverseMap();

            CreateMap<InternalRole, GetAllInternalRolesItem>().ReverseMap();
        }

        #endregion Constructors
    }
}