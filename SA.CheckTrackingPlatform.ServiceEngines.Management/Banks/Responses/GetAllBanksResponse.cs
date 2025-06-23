
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Responses
{
    public class GetAllBanksResponse : BaseResponse<IEnumerable<GetBankByAllItem>>
    {

    }
    public class GetBankByAllItem
    {
        #region Properties 
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
