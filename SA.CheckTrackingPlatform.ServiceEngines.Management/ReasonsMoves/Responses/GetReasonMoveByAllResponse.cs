using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Responses
{
    public class GetReasonMoveByAllResponse : BaseResponse<IEnumerable<GetReasonMoveByAllItem>>
    {

    }
    public class GetReasonMoveByAllItem
    {
        #region Properties
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
