using SA.CheckTrackingPlatform.Domains.Management.Entities;

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
        public ReasonMoveItems ReasonMoveItems { get; set; }

        // public ICollection<Timeline> Timelines { get; set; } // timeline contient status 
        public ICollection<TimelineItems> Timelines { get; set; } // timeline contient status 

        #endregion 
    }
    public class TimelineItems
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int UserId { get; set; }
        public StatusItems StatusItems { get; set; }

        public InternalUserItems InternalUserItem { get; set; }

        public ReasonMoveItems ReasonMoveItems { get; set; }
    }

    public class StatusItems
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
    }


    public class InternalUserItems
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class ReasonMoveItems
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
    }
}
