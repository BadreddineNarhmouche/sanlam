using Microsoft.AspNetCore.Mvc;
using MediatR;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Responses;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchsController : ControllerBase
    {
        #region Fields
        private readonly IMediator _mediator;
        #endregion Fields

        #region Constructors
        public BranchsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        #endregion Constructors

        #region Methods
    
        [HttpGet]
        [Route(nameof(GetBranchById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetBranchByIdResponse> GetBranchById([FromQuery] GetBanchByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllBranchs))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetBranchByAllResponse> GetAllBranchs([FromQuery] GetBranchByAllQuery query)
        {
            return await _mediator.Send(query);
        }

        #endregion Methods
    }
}
