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
        public DateTime? Date { get; set; }
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

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    IEnumerable<Status> statuses = await statusQueryRepository.GetByAllAsync();
                    List<Timeline> timelineCreated = new List<Timeline>();

                    internalUser = await internalUserQueryRepository.GetByElectronicAddressAsync(request.InternalUserElectronicAddress);

                    foreach (var item in request.CheckIds)
                    {
                        var timelineToCreated = new Timeline
                        {
                            CheckId = item,
                            UserId = internalUser.Id,
                            StatusId = statuses.Where(c => c.Code == request.Status).Select(c => c.Id).FirstOrDefault(),
                            ReasonMoveId = request.ReasonMoveId,
                            Comment = request.Comment,
                            DateOfPassage = request.Date ?? DateTime.Now,
                            CreatedById = internalUser.Id.ToString(),
                            CreatedByFullName = internalUser.FirstName + " " + internalUser.LastName,
                            CreationDate = DateTime.Now
                        };

                        timelineCreated.Add(timelineToCreated);
                    }

                    await timelinesCommandRepository.AddRangeAsync(timelineCreated);

                    var obj = new CreateTimelineResponse
                    {
                        CheckId = 1,
                        UserId = internalUser.Id,
                        StatusId = statuses.Where(c => c.Code == request.Status).Select(c => c.Id).FirstOrDefault(),
                    };

                    response.Data = obj;
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
