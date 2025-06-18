using MediatR;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
=======
using SA.CheckTrackingPlatform.ServiceEngines.Management;
>>>>>>> 0c4c2e20744ef0295be16f5a5698d8b46d0107a3
using SA.CheckTrackingPlatform.ServiceEngines.Management.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReasonMoveController : ControllerBase
    {
        #region Fields
        private readonly IMediator _mediator;
        #endregion Fields

        #region Constructors
        public ReasonMoveController(IMediator mediator)
        {
            _mediator = mediator;
        }
        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route(nameof(GetReasonMoveById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetReasonMoveByIdResponse> GetReasonMoveById([FromQuery] GetReasonMoveByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllReasonMoves))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetReasonMoveByAllResponse> GetAllReasonMoves([FromQuery] GetReasonMoveByAllQuery query)
        {
            return await _mediator.Send(query);
        }

        #endregion Methods
    }
}