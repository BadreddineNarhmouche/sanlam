using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class CheckObject
    {
        #region Properties 

        public string? Montant { get; set; }
        public string? CheckNumber { get; set; }
        public string? CreationDate { get; set; }

        public string RecipientName { get; set; }

        public string SinisterName {  get; set; }

        public string AccountNumber { get; set; }

        public string RegisterOrdreNumber { get; set; }

        public string TransactionNumber { get; set; }

        #endregion Properties
    }
}
