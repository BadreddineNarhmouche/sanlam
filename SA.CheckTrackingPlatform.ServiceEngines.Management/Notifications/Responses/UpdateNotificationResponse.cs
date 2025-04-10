namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses
{
    public class UpdateNotificationResponse : BaseResponse<UpdateNotificationResponse>
    {
        #region Properties

        public int Id { get; set; }

        public bool IsSeen { get; set; }

        public string ModificationDate { get; set; }

        #endregion Properties
    }
}