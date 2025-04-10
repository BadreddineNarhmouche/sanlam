namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses
{
    public class GetInternalUserByIdResponse : BaseResponse<GetInternalUserByIdResponse>
    {
        #region Properties

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ElectronicAddress { get; set; }

        #endregion Properties
    }
}