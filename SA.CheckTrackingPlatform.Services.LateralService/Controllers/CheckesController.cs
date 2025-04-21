using Microsoft.AspNetCore.Mvc;
using MediatR;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries;

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

         // Récuperer une chéque par son identifiant        
        [HttpGet]
        [Route(nameof(GetById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetChecksByIdResponse> GetById([FromQuery] GetChecksByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetChecksByIdResponse> GetAllByCriteria([FromQuery] GetChecksByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        #endregion Methods
    }
}
