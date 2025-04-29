using Microsoft.AspNetCore.Mvc;
using MediatR;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        #region Fields
        private readonly IMediator _mediator;
        #endregion Fields

        #region Constructors
        public StatusController(IMediator mediator)
        {
            _mediator = mediator;
        }
        #endregion Constructors

        #region Methods
    
        [HttpGet]
        [Route(nameof(GetStatusById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetByIdResponse> GetStatusById([FromQuery] GetStatusByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllStatus))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetByAllResponse> GetAllStatus([FromQuery] GetByAllQuery query)
        {
            return await _mediator.Send(query);
        }

        #endregion Methods
    }
}
