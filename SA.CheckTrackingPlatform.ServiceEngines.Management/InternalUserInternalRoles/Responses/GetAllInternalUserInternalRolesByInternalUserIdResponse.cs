namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses
{
    public class GetAllInternalUserInternalRolesByInternalUserIdResponse : BaseResponse<IEnumerable<GetAllInternalUserInternalRolesByInternalUserIdItem>>
    {
        #region Properties

        #endregion Properties
    }

    public class GetAllInternalUserInternalRolesByInternalUserIdItem
    {
        #region Properties

        public int InternalUserId { get; set; }

        public int InternalRoleId { get; set; }

        #endregion Properties
    }
}