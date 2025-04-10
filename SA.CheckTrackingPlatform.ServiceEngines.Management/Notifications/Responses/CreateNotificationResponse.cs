namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses
{
    public class CreateNotificationResponse : BaseResponse<CreateNotificationResponse>
    {
        #region Properties

        public string Subject { get; set; }

        public string Body { get; set; }

        #endregion Properties
    }
}