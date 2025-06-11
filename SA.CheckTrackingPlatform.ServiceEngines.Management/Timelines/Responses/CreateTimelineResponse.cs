using SA.CheckTrackingPlatform.Domains.Management.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses
{
    public class CreateTimelineResponse : BaseResponse<CreateTimelineResponse>
    {
        #region Properties

        public int CheckId { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }
        public string ReasonLabel { get; set; }

        #endregion Properties
    }
}
