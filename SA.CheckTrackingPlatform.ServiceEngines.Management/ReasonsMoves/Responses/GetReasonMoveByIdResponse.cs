using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Responses

{
    public class GetReasonMoveByIdResponse : BaseResponse<GetReasonMoveByIdResponse>
    {
        #region Properties
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
        #endregion
    }
}
