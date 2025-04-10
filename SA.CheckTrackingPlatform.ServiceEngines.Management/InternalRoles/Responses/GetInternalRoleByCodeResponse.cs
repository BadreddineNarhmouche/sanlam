namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Responses
{
    public class GetInternalRoleByCodeResponse : BaseResponse<GetInternalRoleByCodeResponse>
    {
        #region Properties

        public int Id { get; set; }

        public string Code { get; set; }

        public string Label { get; set; }

        #endregion Properties
    }
}