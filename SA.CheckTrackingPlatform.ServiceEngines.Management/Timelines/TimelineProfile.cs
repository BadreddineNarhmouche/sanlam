using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines
{
    public class TimelineProfile : Profile
    {
        #region constructors 

        public TimelineProfile()
        {
            CreateMap<Timeline, GetTimelinesByIdResponse>().ReverseMap();
            CreateMap<Timeline, GetTimelinesByCriteriaResponse>().ReverseMap();
        }
        #endregion constructors
    }
}
