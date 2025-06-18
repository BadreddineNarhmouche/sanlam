namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses
{
    public class GetStatusByAllResponse : BaseResponse<IEnumerable<GetStatusByAllItem>>
    {

    }
    public class GetStatusByAllItem
    {
        #region Properties 

        public int Id { get; set; }
        public string Code { get; set; }
        public string Label { get; set; }

        #endregion
    }
}
