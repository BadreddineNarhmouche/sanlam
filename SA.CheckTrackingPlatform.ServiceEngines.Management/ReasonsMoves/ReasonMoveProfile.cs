using AutoMapper;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Responses;
<<<<<<< HEAD
=======
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;
>>>>>>> 0c4c2e20744ef0295be16f5a5698d8b46d0107a3
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
