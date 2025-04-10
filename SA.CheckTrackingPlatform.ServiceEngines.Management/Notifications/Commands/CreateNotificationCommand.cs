using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Commands;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Notifications.Commands
{
    public class CreateNotificationCommand : BaseRequest<CreateNotificationResponse>
    {
        #region Properties

        public string NotificationTypeCode { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public int InternalUserId { get; set; }

        public int? CreatedForInternalUserId { get; set; }

        public int? InternalRoleId { get; set; }

        public long? QuittanceId { get; set; }

        public long? DeliverySlipId { get; set; }

        #endregion Properties
    }

    public class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, CreateNotificationResponse>
    {
        #region Fields

        private readonly INotificationCommandRepository notificationCommandRepository;
        private readonly INotificationTypeQueryRepository notificationTypeQueryRepository;
        private readonly IInternalUserQueryRepository internalUserQueryRepository;
        private readonly IInternalRoleQueryRepository internalRoleQueryRepository;
        //private readonly IQuittanceQueryRepository quittanceQueryRepository;
        //private readonly IDeliverySlipQueryRepository deliverySlipQueryRepository;


        #endregion Fields

        #region Constructors

        public CreateNotificationCommandHandler(
             INotificationCommandRepository notificationCommandRepository,
             INotificationTypeQueryRepository notificationTypeQueryRepository,
             IInternalUserQueryRepository internalUserQueryRepository,
             IInternalRoleQueryRepository internalRoleQueryRepository
            //IQuittanceQueryRepository quittanceQueryRepository,
            //IDeliverySlipQueryRepository deliverySlipQueryRepository
            )
        {
            this.notificationCommandRepository = notificationCommandRepository;
            this.notificationTypeQueryRepository = notificationTypeQueryRepository;
            this.internalUserQueryRepository = internalUserQueryRepository;
            this.internalRoleQueryRepository = internalRoleQueryRepository;
            //this.quittanceQueryRepository = quittanceQueryRepository;
            //this.deliverySlipQueryRepository = deliverySlipQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<CreateNotificationResponse> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                CreateNotificationResponse response = new CreateNotificationResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandRequired;

                    return response;
                }

                if (request.NotificationTypeCode.IsNullOrWhiteSpace())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandFailure;

                    return response;
                }

                NotificationType notificationType = await notificationTypeQueryRepository.GetByCodeAsync(request.NotificationTypeCode);

                if (notificationType.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandFailure;

                    return response;
                }

                InternalUser internalUser = await internalUserQueryRepository.GetByIdAsync(request.InternalUserId);

                if (internalUser.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandFailure;

                    return response;
                }

                //if (request.QuittanceId.HasValue)
                //{
                //    Quittance quittance = await quittanceQueryRepository.GetByIdAsync(request.QuittanceId.Value);

                //    if (quittance.IsNull())
                //    {
                //        response.IsSuccess = false;
                //        response.WarningMessage = WarningMessages.CommandFailure;

                //        return response;
                //    }
                //}

                //if (request.DeliverySlipId.HasValue)
                //{
                //    DeliverySlip deliverySlip = await deliverySlipQueryRepository.GetByIdAsync(request.DeliverySlipId.Value);

                //    if (deliverySlip.IsNull())
                //    {
                //        response.IsSuccess = false;
                //        response.WarningMessage = WarningMessages.CommandFailure;

                //        return response;
                //    }
                //}

                if (request.InternalRoleId.HasValue)
                {
                    InternalRole internalRole = await internalRoleQueryRepository.GetByIdAsync(request.InternalRoleId.Value);

                    if (internalUser.IsNull())
                    {
                        response.IsSuccess = false;
                        response.WarningMessage = WarningMessages.CommandFailure;

                        return response;
                    }
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    string internalUserId = internalUser.Id.ToString();
                    string internalUserFullName = internalUser.FirstName.BuildFullName(internalUser.LastName);

                    Notification notificationToCreate = new Notification();
                    notificationToCreate.NotificationTypeId = notificationType.Id;
                    notificationToCreate.Subject = request.Subject;
                    notificationToCreate.Body = request.Body;
                    notificationToCreate.IsSeen = false;
                    //if (request.QuittanceId.HasValue)
                    //{
                    //    notificationToCreate.QuittanceId = request.QuittanceId.Value;
                    //}
                    //if (request.DeliverySlipId.HasValue)
                    //{
                    //    notificationToCreate.DeliverySlipId = request.DeliverySlipId.Value;
                    //}
                    if (request.CreatedForInternalUserId.HasValue)
                    {
                        notificationToCreate.InternalUserId = request.CreatedForInternalUserId.Value;
                    }
                    if (request.InternalRoleId.HasValue)
                    {
                        notificationToCreate.InternalRoleId = request.InternalRoleId.Value;
                    }
                    notificationToCreate.CreatedById = internalUserId;
                    notificationToCreate.CreatedByFullName = internalUserFullName;
                    notificationToCreate.CreationDate = DateTime.Now;
                    Notification notificationCreated = await notificationCommandRepository.AddAsync(notificationToCreate);

                    if (notificationCreated.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<CreateNotificationResponse>(notificationCreated);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = notificationCreated.IsNotNull();
                    response.InformationMessage = InformationMessages.CommandSucceeded;
                }
                else
                {
                    response.WarningMessage = WarningMessages.CommandFailure;
                }

                #endregion Operations

                return response;
            }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}