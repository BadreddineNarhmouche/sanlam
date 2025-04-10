
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses
{
    public class GetAllInternalUserInternalRolesByInternalUserElectronicAddressResponse : BaseResponse<IEnumerable<GetAllInternalUserInternalRolesByInternalUserElectronicAddressItem>>
    {
    }

    public class GetAllInternalUserInternalRolesByInternalUserElectronicAddressItem
    {
        #region Properties

        public int InternalUserId { get; set; }

        public int InternalRoleId { get; set; }

        public string InternalRoleCode { get; set; }

        #endregion Properties
    }
}