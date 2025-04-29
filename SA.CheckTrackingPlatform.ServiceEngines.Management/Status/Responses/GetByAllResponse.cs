using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses
{
    public class GetByAllResponse : BaseResponse<IEnumerable<GetByAllItem>>
    {
        
    }
    public class GetByAllItem
    {
        #region Properties 
        public int Id { get; protected set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
