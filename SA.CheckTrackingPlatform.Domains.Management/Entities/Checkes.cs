
using System.Data;

namespace SA.CheckTrackingPlatform.Domains.Management.Entities
{
    public class Checks
    {
        #region Constructors

        public Checks() : base()
        {
        }

        #endregion Constructors

        #region Properties

        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public int ServiceId { get; set; }
        public DateTime? CreationDate { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string RecipientName { get; set; }
        public string SinisterNumber { get; set; }
        public string AccountNumber { get; set; }
        public string RegisterOrderNumber { get; set; }
        public decimal TransactionNumber { get; set; }
        public string BeneficiaryName { get; set; }

        // Navigation properties
        public Bank Bank { get; set; }
        public Branch Branch { get; set; }
        public Service Service { get; set; }
        public ICollection<Timeline> Timelines { get; set; }

        #endregion Properties

        public static Checks MapFromDataRowForGetAllByCriteria(DataRow dataRow)
        {
            try
            {
                return new Checks()
                {
                    Id = Convert.ToInt32(dataRow["ID"]),
                    Amount = Convert.ToDecimal(dataRow["AMOUNT"]),
                    BankId = Convert.ToInt32(dataRow["BANKID"]),
                    BranchId = Convert.ToInt32(dataRow["ID"]),
                    ServiceId = Convert.ToInt32(dataRow["ID"]),
                    CheckNumber = dataRow["BRANCHLABEL"].ToString(),
                    CreationDate = dataRow["QUITTANCESTARTDATE"] as DateTime?,
                    LotNumber = Convert.ToString(dataRow["POLICYIDENTIFIER"]),
                    RecipientName = dataRow["PRODUCTLABEL"].ToString(),
                    SinisterNumber = Convert.ToString(dataRow["CLIENTIDENTIFIER"]),
                    AccountNumber = dataRow["CLIENTNAME"].ToString(),
                    RegisterOrderNumber = dataRow["INSUREDIDENTIFIER"].ToString(),
                    BeneficiaryName = dataRow["PARTNERUSERCODE"].ToString(),
                    TransactionNumber = Convert.ToDecimal(dataRow["AMOUNT"]),
                    //SanlamSharePercentage = (dataRow["SANLAMSHAREPERCENTAGE"] == DBNull.Value) ? 0 : Convert.ToDouble(dataRow["SANLAMSHAREPERCENTAGE"]),
                    //PremiumDue = (dataRow["PREMIUMDUE"] == DBNull.Value) ? 0 : Convert.ToDouble(dataRow["PREMIUMDUE"]),
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
