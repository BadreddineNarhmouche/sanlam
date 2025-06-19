using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management
{
    public class ReasonMoveProfile : Profile
    {
        #region Constructors

        public ReasonMoveProfile()
        {
            CreateMap<ReasonMove, GetReasonMoveByIdResponse>().ReverseMap();

            CreateMap<ReasonMove, GetReasonMoveByAllItem>().ReverseMap();
        }

        #endregion Constructors
    }
}
