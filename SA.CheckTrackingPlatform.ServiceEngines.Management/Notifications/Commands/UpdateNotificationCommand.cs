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
    public class UpdateNotificationCommand : BaseRequest<UpdateNotificationResponse>
    {
        #region Properties

        public int Id { get; set; }

        public int InternalUserId { get; set; }

        #endregion Properties
    }

    public class UpdateNotificationCommandHandler : IRequestHandler<UpdateNotificationCommand, UpdateNotificationResponse>
    {
        #region Fields

        private readonly INotificationCommandRepository notificationCommandRepository;
        private readonly INotificationQueryRepository notificationQueryRepository;
        private readonly IInternalUserQueryRepository internalUserQueryRepository;

        #endregion Fields

        #region Constructors

        public UpdateNotificationCommandHandler(INotificationCommandRepository notificationCommandRepository,
             INotificationQueryRepository notificationQueryRepository,
             IInternalUserQueryRepository internalUserQueryRepository)
        {
            this.notificationCommandRepository = notificationCommandRepository;
            this.internalUserQueryRepository = internalUserQueryRepository;
            this.notificationQueryRepository = notificationQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<UpdateNotificationResponse> Handle(UpdateNotificationCommand request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                UpdateNotificationResponse response = new UpdateNotificationResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandRequired;

                    return response;
                }

                if (request.Id.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandFailure;

                    return response;
                }

                Notification notificationToUpdate = await notificationQueryRepository.GetByIdAsync(request.Id);

                if (notificationToUpdate.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.CommandFailure;

                    return response;
                }

                if (request.InternalUserId.IsNull())
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

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    string internalUserId = internalUser.Id.ToString();
                    string internalUserFullName = internalUser.FirstName.BuildFullName(internalUser.LastName);

                    notificationToUpdate.IsSeen = true;
                    notificationToUpdate.ModificationDate = DateTime.Now;
                    notificationToUpdate.ModifiedById = internalUserId;
                    notificationToUpdate.ModifiedByFullName = internalUserFullName;
                    Notification notificationUpdated = await notificationCommandRepository.UpdateAsync(notificationToUpdate);

                    if (notificationUpdated.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<UpdateNotificationResponse>(notificationUpdated);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = notificationUpdated.IsNotNull();
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