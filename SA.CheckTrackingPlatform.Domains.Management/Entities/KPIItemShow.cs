using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class KPIItemShow
    {
        #region properties
        public double AmountRef { get; set; }
        public string? CheckNumberRef { get; set; }
        public string? LotNumberRef { get; set; }
        public string? RecipientNameRef { get; set; }
        public string? BeneficiaryNameRef { get; set; }
        public DateTime CreationDateRef { get; set; }

        #endregion properties
    }
}
