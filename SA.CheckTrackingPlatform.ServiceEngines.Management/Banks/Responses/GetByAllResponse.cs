

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Responses
{
    public class GetByAllResponse : BaseResponse<IEnumerable<GetByAllItem>>
    {
        
    }
    public class GetByAllItem
    {
        #region Properties 
        public int Id { get; set; }

        #endregion
    }
}
