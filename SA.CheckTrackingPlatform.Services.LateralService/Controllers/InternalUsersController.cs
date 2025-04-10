using MediatR;
using Microsoft.AspNetCore.Mvc;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InternalUsersController : ControllerBase
    {
        #region Fields

        private readonly IMediator mediator;

        #endregion Fields

        #region Constructors

        public InternalUsersController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #endregion Constructors

        #region Methods

        [HttpGet]
        [Route(nameof(GetById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetInternalUserByIdResponse> GetById([FromQuery] GetInternalUserByIdQuery query)
        {
            return await this.mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetByElectronicAddress))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetInternalUserByElectronicAddressResponse> GetByElectronicAddress([FromQuery] GetInternalUserByElectronicAddressQuery query)
        {
            return await this.mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(GetAllByCriteria))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllInternalUsersByCriteriaResponse> GetAllByCriteria([FromQuery] GetAllInternalUsersByCriteriaQuery query)
        {
            return await this.mediator.Send(query);
        }

        #endregion Methods
    }
}