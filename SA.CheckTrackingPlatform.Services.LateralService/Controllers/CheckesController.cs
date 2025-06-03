using Microsoft.AspNetCore.Mvc;
using MediatR;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

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

        // Récuperer un chéque par son identifiant        
        [HttpGet]
        [Route(nameof(GetById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[CustomAuthorize(Constants.InternalRoleCodes.User)]
        public async Task<GetChecksByIdResponse> GetById([FromQuery] GetChecksByIdQuery query)
        {
            return await _mediator.Send(query);
        }

        // Récuperer un chéque par des critères
        [HttpGet]
        [Route(nameof(GetAllByCriteria))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<GetAllByCriteriaResponse> GetAllByCriteria([FromQuery] GetAllByCriteriaQuery query)
        {
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
