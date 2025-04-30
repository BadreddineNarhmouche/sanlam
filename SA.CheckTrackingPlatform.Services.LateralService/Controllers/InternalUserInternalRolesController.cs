using MediatR;
using Microsoft.AspNetCore.Mvc;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InternalUserInternalRolesController : ControllerBase
    {
        #region Fields

        private readonly IMediator mediator;

        #endregion Fields

        #region Constructors

        public InternalUserInternalRolesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route(nameof(GetAllByCriteria))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllInternalUserInternalRolesByCriteriaResponse> GetAllByCriteria([FromQuery] GetAllInternalUserInternalRolesByCriteriaQuery query)
        {
            return await this.mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllByInternalUserElectronicAddress))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllInternalUserInternalRolesByInternalUserElectronicAddressResponse> GetAllByInternalUserElectronicAddress([FromQuery] GetAllInternalUserInternalRolesByInternalUserElectronicAddressQuery query)
        {
           // query.InternalUserElectronicAddress = User.FindFirst(KeycloakAttributes.InternalUserElectronicAddress).Value;
           // sans autorisation par keycloak on rentre jamais
           // verification par Keycloak
            return await this.mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllByInternalUserId))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllInternalUserInternalRolesByInternalUserIdResponse> GetAllByInternalUserId([FromQuery] GetAllInternalUserInternalRolesByInternalUserIdQuery query)
        {
            return await this.mediator.Send(query);
        }

        #endregion Methods
    }
}