using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.ReasonsMoves.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.ReasonsMoves
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
