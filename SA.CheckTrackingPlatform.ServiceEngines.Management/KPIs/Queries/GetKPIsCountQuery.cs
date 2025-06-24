using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Queries
{
    public class GetKPIsCountQuery : BaseRequest<GetKPIsCountResponse>
    {
        #region properties

        #endregion Properties 
    }


    public class GetKPIsCountQueryHandler : IRequestHandler<GetKPIsCountQuery, GetKPIsCountResponse>
    {
        #region Fields 

        private readonly ITimelinesQueryRepository timelinesQueryRepository;
        private readonly IMediator mediator;

        #endregion Fields 

        #region Constructors 

        public GetKPIsCountQueryHandler(ITimelinesQueryRepository timelinesQueryRepository , IMediator mediator)
        {
            this.timelinesQueryRepository = timelinesQueryRepository;
            this.mediator = mediator;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetKPIsCountResponse> Handle(GetKPIsCountQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetKPIsCountResponse response = new GetKPIsCountResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    try
                    {
                        var query = timelinesQueryRepository.GetKpiQuery(
                            Constants.TimelineStatusCodes.ReceivedOffice,
                            new List<string>
                            {
                Constants.TimelineStatusCodes.SendClient,
                Constants.TimelineStatusCodes.ReturnClient,
                Constants.TimelineStatusCodes.ReturnTrade,
                Constants.TimelineStatusCodes.ReceiptReturnCheck,
                            });

                        var data = new GetKPIsCountResponse
                        {
                            Count = await query.CountAsync(),
                            Id = 0
                        };

                        response.Data = data;
                        response.IsSuccess = true;
                        response.IsPopulated = true;
                        response.InformationMessage = InformationMessages.QuerySucceeded;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        response.IsSuccess = false;
                        response.WarningMessage = WarningMessages.QueryFailure;
                    }
                }
                else
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryFailure;
                }


                #endregion Operations

                return response;
            }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}
