namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Responses
{
    public class GetAllInternalRolesResponse : BaseResponse<IEnumerable<GetAllInternalRolesItem>>
    {
        #region Properties

        #endregion Properties
    }

    public class GetAllInternalRolesItem
    {
        #region Properties

        public int Id { get; set; }

        public string Code { get; set; }

        public string Label { get; set; }

        #endregion Properties
    }
}