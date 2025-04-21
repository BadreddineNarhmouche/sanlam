using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses
{
    public class GetAllByCriteriaResponse : BaseResponse<List<GetAllByCriteriaItem>>
    {
        
    }
    public class GetAllByCriteriaItem
    {
        #region Properties 
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public int ServiceId { get; set; }
        public DateTime CreationDate { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string RecipientName { get; set; }
        public string SinisterNumber { get; set; }
        public string AccountNumber { get; set; }
        public string RegisterOrderNumber { get; set; }
        public decimal TransactionNumber { get; set; }
        public string BeneficiaryName { get; set; }

        #endregion
    }
}
