using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Timelines.Commands
{
    public class CreateTimelineCommand : BaseRequest<CreateTimelineResponse>
    {
        public List<int> CheckIds { get; set; }
        public string? InternalUserElectronicAddress { get; set; }
        public string? Comment { get; set; }
        public int? ReasonMoveId { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }

    public class CreateTimelineCommandHandler : IRequestHandler<CreateTimelineCommand, CreateTimelineResponse>
    {
        #region Fields

        private readonly IStatusQueryRepository statusQueryRepository;
        private readonly ITimelinesCommandRepository timelinesCommandRepository;
        private readonly IInternalUserQueryRepository internalUserQueryRepository;

        #endregion Fields 

        #region Constructors 

        public CreateTimelineCommandHandler(IStatusQueryRepository statusQueryRepository, ITimelinesCommandRepository timelinesCommandRepository, IInternalUserQueryRepository internalUserQueryRepository)
        {
            this.statusQueryRepository = statusQueryRepository;
            this.timelinesCommandRepository = timelinesCommandRepository;
            this.internalUserQueryRepository = internalUserQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<CreateTimelineResponse> Handle(CreateTimelineCommand request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                CreateTimelineResponse response = new CreateTimelineResponse();
                InternalUser internalUser = new InternalUser();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.Status.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.Date.IsNull())
                {
                    request.Date = DateTime.Now;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    IEnumerable<Status> statuses = await statusQueryRepository.GetByAllAsync();
                    Timeline timelineToCreated = new Timeline();
                    List<Timeline> timelineCreated = new List<Timeline>();

                    internalUser = await internalUserQueryRepository.GetByElectronicAddressAsync(request.InternalUserElectronicAddress);

                    foreach (var item in request.CheckIds)
                    {
                        timelineToCreated.CheckId = item;
                        timelineToCreated.UserId = internalUser.Id;
                        timelineToCreated.StatusId = statuses.Where(c => c.Code == request.Status).Select(c => c.Id).FirstOrDefault();
                        timelineToCreated.ReasonMoveId = request.ReasonMoveId ?? null;
                        timelineToCreated.Comment = request.Comment ?? null;
                        timelineToCreated.DateOfPassage = request.Date;

                        timelineCreated.Add(await timelinesCommandRepository.AddAsync(timelineToCreated));
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = timelineCreated.Count > 0 ? true : false;
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
