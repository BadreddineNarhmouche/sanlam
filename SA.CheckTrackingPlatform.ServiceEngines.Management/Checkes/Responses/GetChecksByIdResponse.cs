using SA.CheckTrackingPlatform.Domains.Management.Entities;
using System.Collections;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses
{
    public class GetChecksByIdResponse : BaseResponse<GetChecksByIdResponse>
    {
        #region Properties 

        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public DateTime CreationDate { get; set; }
        public int UserId { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string RecipientName { get; set; }
        public string SinisterNumber { get; set; }
        public string AccountNumber { get; set; }
        public string RegisterOrderNumber { get; set; }
        public decimal TransactionNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BeneficiaryName { get; set; }
        public StatusItems StatusItems { get; set; }
        public InternalUser InternalUser { get; set; }
        public ReasonMovesItems ReasonMoveItems { get; set; }

       // public ICollection<Timeline> Timelines { get; set; } // timeline contient status 
        public ICollection<TimelineItems> Timelines { get; set; } // timeline contient status 

        #endregion 
    }
      public class TimelineItems
    {
        public int id { get; set; }

        public DateTime date{ get; set; }

        public int userId { get; set; }
        public StatusItems StatusItems { get; set; }

        public InternalUserItems InternalUserItem { get; set; }

        public ReasonMovesItems ReasonMovesItems { get; set; }
    }

    public class StatusItems
    {
        public int id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
    }


    public class InternalUserItems
    {
        public int id { get; set; }
        public string FirstName { get;set; }
        public string LastName { get; set; }
    }

    public class ReasonMovesItems
    {
        public int id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
    }
}
