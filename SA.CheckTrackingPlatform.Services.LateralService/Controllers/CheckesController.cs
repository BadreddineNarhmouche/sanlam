using MediatR;
using Microsoft.AspNetCore.Mvc;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckesController : ControllerBase
    {
        #region Fields
        private readonly IMediator _mediator;
        #endregion Fields

        #region Constructors
        public CheckesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route(nameof(GetById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetChecksByIdResponse> GetById([FromQuery] GetChecksByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllByCriteria))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllByCriteriaResponse> GetAllByCriteria([FromQuery] GetAllByCriteriaQuery query)
        {
            query.InternalUserElectronicAddress ??= User.FindFirst(KeycloakAttributes.InternalUserElectronicAddress)?.Value;
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllChecks))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllResponse> GetAllChecks([FromQuery] GetAllChecksQuery query)
        {
            return await _mediator.Send(query);
        }

        #endregion Methods
    }
}
