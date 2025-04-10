namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses
{
    public class GetAllNotificationsByCriteriaResponse : BasePagedResponse<IEnumerable<GetAllNotificationsItem>>
    {
        #region Properties

        public long UnseenCount { get; set; }

        #endregion Properties

    }

    public class GetAllNotificationsItem
    {
        #region Properties

        public long Id { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public bool IsSeen { get; set; }

        public long? QuittanceId { get; set; }

        public long? DeliverySlipId { get; set; }

        public long? NotificationTypeId { get; set; }

        public string? NotificationTypeCode { get; set; }

        public string? AssignToUserFullName { get; set; }

        public string? AssignToRole { get; set; }

        public DateTime CreationDate { get; set; }

        public string DisplayableCreationDate { get; set; }

        #endregion Properties
    }
}