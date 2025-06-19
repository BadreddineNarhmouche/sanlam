using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Queries
{
    public class GetTimelinesByCriteriaQuery : BaseRequest<GetTimelinesByCriteriaResponse>
    {
        #region Properties 
        public List<int>? ids { get; set; }
        public List<int>? ChecksIds { get; set; }
        public List<int>? UserIds { get; set; }
        public int? StatusId { get; set; }
        public string? Reasonlabel { get; set; }

        #endregion Properties 
    }

    public class GetTimelinesByCriteriaQueryHandler : IRequestHandler<GetTimelinesByCriteriaQuery, GetTimelinesByCriteriaResponse>
    {
        #region Fields 

        private readonly ITimelinesQueryRepository timelinesQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetTimelinesByCriteriaQueryHandler(ITimelinesQueryRepository timelinesQueryRepository)
        {
            this.timelinesQueryRepository = timelinesQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetTimelinesByCriteriaResponse> Handle(GetTimelinesByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetTimelinesByCriteriaResponse response = new GetTimelinesByCriteriaResponse();

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
                    IEnumerable<Timeline> timelines = await timelinesQueryRepository.GetTimelinesByCriteriaAsync(request.ids, request.ChecksIds, request.UserIds, request.StatusId
                        , request.Reasonlabel);

                    if (timelines.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<List<GetTimelinesByCriteriaResponse>>(timelines);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = timelines.IsNotNull();
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
