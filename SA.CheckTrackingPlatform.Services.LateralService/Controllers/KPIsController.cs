using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.FileExcel;

namespace SA.CheckTrackingPlatform.Services.LateralService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KPIsController : ControllerBase
    {
        #region Fields 

        private readonly IMediator mediator;

        #endregion Fields 

        #region Constructors 

        public KPIsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #endregion Constructors

        #region Methods 
        [HttpGet]
        [Route(nameof(GetAllCheckTracking))]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<GetKPIsCountResponse> GetAllCheckTracking([FromQuery] GetKPIsCountQuery query)
        {
            return await this.mediator.Send(query);
        }

        [HttpGet]
        [Route(nameof(ExportFileExcel))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<FileExcelResponse> ExportFileExcel([FromQuery] FileExcelQuery query)
        {
            return await this.mediator.Send(query);
        }
        #endregion Methods
    }
}
