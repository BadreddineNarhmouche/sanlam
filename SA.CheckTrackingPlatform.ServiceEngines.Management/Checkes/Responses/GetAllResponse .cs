
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses
{
    public class GetAllResponse  : BaseResponse<List<GetAllItem>>
    {
        
    }

    public class GetAllItem
    {
        #region Properties 
        public int Id { get; set; }
        public double Amount { get; set; }
        public string ServiceName { get; set; }
        public string CheckNumber { get; set; }
        public string LotNumber { get; set; }
        public string BeneficiaryName { get; set; }

        #endregion
    }
}
