
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Responses
{
    public class GetBranchByIdResponse : BaseResponse<GetBranchByIdResponse>
    {
        #region Properties 

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
