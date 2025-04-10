namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses
{
    public class GetAllInternalUsersByCriteriaResponse : BaseResponse<IEnumerable<GetAllInternalUsersByCriteriaItem>>
    {
        #region Properties

        #endregion Properties
    }

    public class GetAllInternalUsersByCriteriaItem
    {
        #region Properties

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ElectronicAddress { get; set; }

        public string StatusCode { get; set; }

        public string StatusLabel { get; set; }

        public string ParentInternalUserFirstName { get; set; }

        public string ParentInternalUserLastName { get; set; }

        #endregion Properties
    }
}