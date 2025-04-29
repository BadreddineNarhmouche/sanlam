
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Responses
{
    public class GetBankByIdResponse : BaseResponse<GetBankByIdResponse>
    {
        #region Properties 

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
