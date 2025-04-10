using MediatR;
using Microsoft.AspNetCore.Mvc;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Responses;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InternalRolesController : ControllerBase
    {
        #region Fields

        private readonly IMediator mediator;

        #endregion Fields

        #region Constructors

        public InternalRolesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route(nameof(GetByCode))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetInternalRoleByCodeResponse> GetByCode([FromQuery] GetInternalRoleByCodeQuery query)
        {
            return await this.mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAll))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllInternalRolesResponse> GetAll([FromQuery] GetAllInternalRolesQuery query)
        {
            return await this.mediator.Send(query);
        }

        #endregion Methods
    }
}