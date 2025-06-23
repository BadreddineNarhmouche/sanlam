

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Responses
{
    public class GetBranchByAllResponse : BaseResponse<IEnumerable<GetBranchByAllItem>>
    {

    }
    public class GetBranchByAllItem
    {
        #region Properties 
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
