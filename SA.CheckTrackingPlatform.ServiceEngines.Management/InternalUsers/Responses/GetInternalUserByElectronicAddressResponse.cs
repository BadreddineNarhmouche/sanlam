namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses
{
    public class GetInternalUserByElectronicAddressResponse : BaseResponse<GetInternalUserByElectronicAddressResponse>
    {
        #region Properties

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ElectronicAddress { get; set; }

        #endregion Properties
    }
}