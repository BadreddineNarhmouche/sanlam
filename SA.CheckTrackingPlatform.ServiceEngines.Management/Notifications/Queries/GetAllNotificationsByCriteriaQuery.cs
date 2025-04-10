using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Queries
{
    public class GetAllNotificationsByCriteriaQuery : BasePagedRequest<GetAllNotificationsByCriteriaResponse>
    {
        #region Properties

        public int? InternalUserId { get; set; }

        public string? NotificationTypeCode { get; set; }

        public DateTime? FromCreationDate { get; set; }

        public DateTime? ToCreationDate { get; set; }

        public bool? IsSeen { get; set; }

        public string? InternalRoleCode { get; set; }

        public long? DeliverySlipId { get; set; }

        public long? QuittanceId { get; set; }

        public bool CalculateTotalCount { get; set; }

        #endregion Properties
    }

    public class GetAllNotificationsByCriteriaQueryHandler : IRequestHandler<GetAllNotificationsByCriteriaQuery, GetAllNotificationsByCriteriaResponse>
    {
        #region Fields

        private readonly INotificationQueryRepository notificationQueryRepository;
        private readonly INotificationTypeQueryRepository notificationTypeQueryRepository;
        private readonly IInternalRoleQueryRepository internalRoleQueryRepository;


        #endregion Fields

        #region Constructors

        public GetAllNotificationsByCriteriaQueryHandler(
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

        public async Task<GetAllNotificationsByCriteriaResponse> Handle(GetAllNotificationsByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllNotificationsByCriteriaResponse response = new GetAllNotificationsByCriteriaResponse();

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
                    long unseenCount = 0;
                    IEnumerable<Notification> notifications = await notificationQueryRepository.GetAllByCriteriaAsync(request.InternalUserId, notificationType?.Id,
                        request.FromCreationDate, request.ToCreationDate, request.IsSeen,
                        internalRole?.Id, request.DeliverySlipId, request.QuittanceId,
                        request.PageIndex, request.PageSize);

                    int totalCount = request.CalculateTotalCount ?
                    await notificationQueryRepository.CountAllByCriteriaAsync(request.InternalUserId, notificationType?.Id,
                        request.FromCreationDate, request.ToCreationDate, request.IsSeen,
                        internalRole?.Id, request.DeliverySlipId, request.QuittanceId) : 0;

                    if (request.IsSeen.HasValue)
                    {
                        if (request.IsSeen.Value)
                        {
                            unseenCount = await notificationQueryRepository.CountAllByCriteriaAsync(request.InternalUserId, notificationType?.Id,
                            request.FromCreationDate, request.ToCreationDate, false,
                            internalRole?.Id, request.DeliverySlipId, request.QuittanceId);
                        }
                        else
                        {
                            unseenCount = totalCount;
                        }
                    }
                    else
                    {
                        unseenCount = notifications.Count(o => !o.IsSeen);
                    }

                    if (!notifications.IsNullOrEmpty())
                    {
                        response.UnseenCount = unseenCount;
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetAllNotificationsItem>>(notifications);
                        response.FillPageInformation(notifications.Count(), totalCount, request.PageIndex, request.PageSize);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = !notifications.IsNullOrEmpty();
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