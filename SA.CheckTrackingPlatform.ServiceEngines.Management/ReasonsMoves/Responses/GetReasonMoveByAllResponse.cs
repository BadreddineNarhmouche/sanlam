namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Responses
{
    public class GetReasonMoveByAllResponse : BaseResponse<IEnumerable<GetReasonMoveByAllItem>>
    {

    }
    public class GetReasonMoveByAllItem
    {
        #region Properties
        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
