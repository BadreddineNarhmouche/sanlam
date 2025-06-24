

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses
{
    public class GetKPIsCountResponse : BaseResponse<GetKPIsCountResponse>
    {

        #region Properties 

        public int NumberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit { get; set; }
        public int NumberOfChecksReceivedByBusinessUnitButNotByRegistryOffice { get; set; }
        public int NumberOfChecksReceivedByRegistryOfficeButNotSentToClient { get; set; }
        public int NumberOfReturnedChecksNotYetReceived { get; set; }

        #endregion Properties

    }
}
