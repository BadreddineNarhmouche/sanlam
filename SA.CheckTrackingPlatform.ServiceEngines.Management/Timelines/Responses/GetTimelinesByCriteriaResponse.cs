namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses
{
    public class GetTimelinesByCriteriaResponse : BaseResponse<List<GetTimelinesByCriteriaResponse>>
    {
        #region Properties    
        public int CheckId { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }
        public string ReasonLabel { get; set; }

        #endregion Properties
    }
}
