namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses
{
    public class GetNotificationByIdResponse : BaseResponse<GetNotificationByIdResponse>
    {
        #region Properties

        public int Id { get; set; }

        public string NotificationTypeCode { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public bool IsSeen { get; set; }

        public string CreationDate { get; set; }

        #endregion Properties
    }
}