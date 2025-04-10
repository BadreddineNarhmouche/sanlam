namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses
{
    public class GetAllInternalUserInternalRolesByCriteriaResponse : BaseResponse<IEnumerable<GetAllInternalUserInternalRolesByCriteriaItem>>
    {
        #region Properties

        #endregion Properties
    }

    public class GetAllInternalUserInternalRolesByCriteriaItem
    {
        #region Properties

        public int InternalUserId { get; set; }

        public int InternalRoleId { get; set; }

        #endregion Properties
    }
}