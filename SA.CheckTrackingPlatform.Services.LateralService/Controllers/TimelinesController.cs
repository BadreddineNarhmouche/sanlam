using MediatR;
using Microsoft.AspNetCore.Mvc;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Commands;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses;
using static System.CoreConstants;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TimelinesController : Controller
    {

        #region Fields
        private readonly IMediator _mediator;
        #endregion Fields

        #region Constructors
        public TimelinesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route(nameof(GetTimeLineById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetTimelinesByIdResponse> GetTimeLineById([FromQuery] GetTimelinesByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetTimelinesByCriteria))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetTimelinesByCriteriaResponse> GetTimelinesByCriteria([FromQuery] GetTimelinesByCriteriaQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost]
        [Route(nameof(CreateTimeLine))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<CreateTimelineResponse> CreateTimeLine([FromForm] CreateTimelineCommand command)
        {
            // command.InternalUserElectronicAddress = User.FindFirst(KeycloakAttributes.InternalUserElectronicAddress).Value;
            return await _mediator.Send(command);
        }
        #endregion Methods
        // remplissage null => date de system
    }
}