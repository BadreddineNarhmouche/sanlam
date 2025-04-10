using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Queries
{
    public class GetNotificationByIdQuery : BaseRequest<GetNotificationByIdResponse>
    {
        #region Properties

        public int Id { get; set; }

        #endregion Properties
    }

    public class GetNotificationByIdQueryHandler : IRequestHandler<GetNotificationByIdQuery, GetNotificationByIdResponse>
    {
        #region Fields

        private readonly INotificationQueryRepository notificationQueryRepository;

        #endregion Fields

        #region Constructors

        public GetNotificationByIdQueryHandler(INotificationQueryRepository notificationQueryRepository)
        {
            this.notificationQueryRepository = notificationQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetNotificationByIdResponse> Handle(GetNotificationByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetNotificationByIdResponse response = new GetNotificationByIdResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.Id <= 0)
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.AllCriteriaRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    Notification notification = await notificationQueryRepository.GetByIdAsync(request.Id);

                    if (notification.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetNotificationByIdResponse>(notification);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = notification.IsNotNull();
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