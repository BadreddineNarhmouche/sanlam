using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses
{
    public class ExportAllChecksDocumentByCriteriaResponse : BasePagedResponse<ExportAllChecksDocumentByCriteriaResponse>
    {
        #region Properties 

        public string Name { get; set; }
        public string ContentType { get; set; }
        public byte [] Content { get; set; }

        #endregion Properties
    }
}
