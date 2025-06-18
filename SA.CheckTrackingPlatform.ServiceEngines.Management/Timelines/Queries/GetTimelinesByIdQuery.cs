using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Queries
{
    public class GetTimelinesByIdQuery : BaseRequest<GetTimelinesByIdResponse>
    {
        #region properties 
        public int Id { get; set; }

        #endregion properties

    }

    public class GetTimelinesByIdQueryHandler : IRequestHandler<GetTimelinesByIdQuery, GetTimelinesByIdResponse>
    {
        #region Fields

        private readonly ITimelinesQueryRepository timelinesQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetTimelinesByIdQueryHandler(ITimelinesQueryRepository timelinesQueryRepository)
        {
            this.timelinesQueryRepository = timelinesQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetTimelinesByIdResponse> Handle(GetTimelinesByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetTimelinesByIdResponse response = new GetTimelinesByIdResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.Id <= 0 || request.Id.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.AllCriteriaRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {

                    Timeline timeline = await timelinesQueryRepository.GetTimelineByIdAsync(request.Id);


                    if (timeline.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetTimelinesByIdResponse>(timeline);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = timeline.IsNotNull();
                    response.InformationMessage = InformationMessages.QuerySucceeded;
                }
                else
                {
                    response.WarningMessage = WarningMessages.QueryFailure;
                }

                #endregion Operations

                return response;
            }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}