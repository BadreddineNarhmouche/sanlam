

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses
{
    public class GetKPIsCountResponse : BaseResponse<GetKPIsCountResponse>
    {

        #region Properties 

        public long Id { get; set; }
        public int Count { get; set; }

        #endregion Properties

    }
}
