using SA.CheckTrackingPlatform.Domains.Management.Entities;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses
{
    public class GetTimelinesByIdResponse : BaseResponse<GetTimelinesByIdResponse>
    {
        #region Properties

        public int CheckId { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }
        public string ReasonLabel { get; set; }
        public InternalUser InternalUserItems { get; set; }

        #endregion Properties
    }
}
