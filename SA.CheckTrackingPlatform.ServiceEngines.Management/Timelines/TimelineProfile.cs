using AutoMapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
