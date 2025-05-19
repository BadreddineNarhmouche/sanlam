using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses
{
    public class GetAllByCriteriaResponse : BasePagedResponse<List<GetAllByCriteriaItem>>
    {
        
    }
    // On peut renvoyer moins d'élements 
    public class GetAllByCriteriaItem
    {
        #region Properties 
        public int Id { get; set; }
        public double Amount { get; set; }
        public string ServiceName { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string BeneficiaryName { get; set; }

        #endregion Properties
    }
}
