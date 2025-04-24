using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Queries
{
    public class CountAllNotificationsByCriteriaQuery : BaseRequest<CountAllNotificationsByCriteriaResponse>
    {
        public int? InternalUserId { get; set; }

        public int? IsSeen { get; set; }

        public string? NotificationTypeCode { get; set; }

        public DateTime? FromCreationDate { get; set; }

        public DateTime? ToCreationDate { get; set; }

        public string? InternalRoleCode { get; set; }

        public long? DeliverySlipId { get; set; }

        public long? QuittanceId { get; set; }
    }

    public class CountAllNotificationsByCriteriaQueryHandler : IRequestHandler<CountAllNotificationsByCriteriaQuery, CountAllNotificationsByCriteriaResponse>
    {
        #region Fields

        private readonly INotificationQueryRepository notificationQueryRepository;
        private readonly INotificationTypeQueryRepository notificationTypeQueryRepository;
        private readonly IInternalRoleQueryRepository internalRoleQueryRepository;

        #endregion Fields

        #region Constructors

        public CountAllNotificationsByCriteriaQueryHandler(
            INotificationQueryRepository notificationQueryRepository,
            INotificationTypeQueryRepository notificationTypeQueryRepository,
            IInternalRoleQueryRepository internalRoleQueryRepository
            )
        {
            this.notificationQueryRepository = notificationQueryRepository;
            this.notificationTypeQueryRepository = notificationTypeQueryRepository;
            this.internalRoleQueryRepository = internalRoleQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<CountAllNotificationsByCriteriaResponse> Handle(CountAllNotificationsByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                CountAllNotificationsByCriteriaResponse response = new CountAllNotificationsByCriteriaResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.InternalUserId.IsNull()
                && request.NotificationTypeCode.IsNullOrWhiteSpace()
                && !request.FromCreationDate.HasValue
                && !request.ToCreationDate.HasValue
                && !request.IsSeen.HasValue
                && request.InternalRoleCode.IsNullOrWhiteSpace()
                && !request.DeliverySlipId.HasValue
                && !request.QuittanceId.HasValue)
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.OneCriterionRequired;

                    return response;
                }

                NotificationType notificationType = null;

                if (!request.NotificationTypeCode.IsNullOrWhiteSpace())
                {
                    notificationType = await notificationTypeQueryRepository.GetByCodeAsync(request.NotificationTypeCode);

                    if (notificationType.IsNull())
                    {
                        response.IsSuccess = false;
                        response.WarningMessage = WarningMessages.QueryFailure;

                        return response;
                    }
                }

                InternalRole internalRole = null;
                if (!request.InternalRoleCode.IsNullOrWhiteSpace())
                {
                    internalRole = await internalRoleQueryRepository.GetByCodeAsync(request.InternalRoleCode);

                    if (internalRole.IsNull())
                    {
                        response.IsSuccess = false;
                        response.WarningMessage = WarningMessages.QueryFailure;

                        return response;
                    }
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    int count = await notificationQueryRepository.CountAllByCriteriaAsync(request.InternalUserId, notificationType?.Id,
                        request.FromCreationDate, request.ToCreationDate, request.IsSeen,
                        internalRole?.Id, request.DeliverySlipId, request.QuittanceId);

                    response.Data = new CountAllNotificationsByCriteriaResponse { Count = count };

                    response.IsSuccess = true;
                    response.IsPopulated = true;
                    response.InformationMessage = InformationMessages.QuerySucceeded;
                }
                else
                {
                    response.WarningMessage = WarningMessages.QueryFailure;
                }

                #endregion Operations

                return response;
            },
            request, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}