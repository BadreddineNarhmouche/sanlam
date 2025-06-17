using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

<<<<<<< HEAD
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Responses
=======
namespace SA.CheckTrackingPlatform.ServiceEngines.Management
>>>>>>> 0c4c2e20744ef0295be16f5a5698d8b46d0107a3
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
