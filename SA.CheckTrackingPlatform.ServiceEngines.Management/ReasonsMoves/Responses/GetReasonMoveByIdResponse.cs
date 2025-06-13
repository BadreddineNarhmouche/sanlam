using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.ReasonsMoves.Responses
{
    public class GetReasonMoveByIdResponse : BaseResponse<GetReasonMoveByAllResponse>
    {
        #region Properties
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
        #endregion
    }
}
