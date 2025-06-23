namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Responses
{
    public class GetReasonMoveByIdResponse : BaseResponse<GetReasonMoveByIdResponse>
    {
        #region Properties
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }
        #endregion
    }
}
