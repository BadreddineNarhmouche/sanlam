using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder
{
    public class BranchsProfile : Profile
    {
        #region Constructors 

        public BranchsProfile()
        {
            CreateMap<Branch, GetBranchByIdResponse>().ReverseMap();

            CreateMap<Branch, GetBranchByAllItem>().ReverseMap();
        }

        #endregion Constructors
    }
}
