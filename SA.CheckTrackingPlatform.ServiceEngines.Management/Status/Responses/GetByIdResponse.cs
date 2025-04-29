
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses
{
    public class GetByIdResponse : BaseResponse<GetByIdResponse>
    {
        #region Properties 

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
