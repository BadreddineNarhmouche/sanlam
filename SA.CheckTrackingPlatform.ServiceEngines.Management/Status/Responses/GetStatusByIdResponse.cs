
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses
{
    public class GetStatusByIdResponse : BaseResponse<GetStatusByIdResponse>
    {
        #region Properties 

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
