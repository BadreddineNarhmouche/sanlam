using Microsoft.AspNetCore.Mvc;
using MediatR;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Responses;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BanksController : ControllerBase
    {
        #region Fields
        private readonly IMediator _mediator;
        #endregion Fields

        #region Constructors
        public BanksController(IMediator mediator)
        {
            _mediator = mediator;
        }
        #endregion Constructors

        #region Methods
    
        [HttpGet]
        [Route(nameof(GetBankById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetBankByIdResponse> GetBankById([FromQuery] GetBankByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllBanks))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllBanksResponse> GetAllBanks([FromQuery] GetBankByAllQuery query)
        {
            return await _mediator.Send(query);
        }

        #endregion Methods
    }
}
