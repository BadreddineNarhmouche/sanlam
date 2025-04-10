using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Queries
{
    public class ExistInternalUserInternalRoleByCriteriaQuery : BaseRequest<ExistInternalUserInternalRoleByCriteriaResponse>
    {
        #region Properties

        public string? InternalUserElectronicAddress { get; set; }

        public string? InternalRoleCode { get; set; }

        #endregion Properties
    }

    public class ExistInternalUserInternalRoleByCriteriaQueryHandler : IRequestHandler<ExistInternalUserInternalRoleByCriteriaQuery, ExistInternalUserInternalRoleByCriteriaResponse>
    {
        #region Fields

        private readonly IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository;

        #endregion Fields

        #region Constructors

        public ExistInternalUserInternalRoleByCriteriaQueryHandler(IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository)
        {
            this.internalUserInternalRoleQueryRepository = internalUserInternalRoleQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<ExistInternalUserInternalRoleByCriteriaResponse> Handle(ExistInternalUserInternalRoleByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                ExistInternalUserInternalRoleByCriteriaResponse response = new ExistInternalUserInternalRoleByCriteriaResponse();

                #endregion Declarations

                #region Validations

                if (request.InternalUserElectronicAddress.IsNullOrWhiteSpace() || request.InternalRoleCode.IsNullOrWhiteSpace())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.AllCriteriaRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    response.IsFound = await internalUserInternalRoleQueryRepository.ExistByCriteriaAsync(request.InternalUserElectronicAddress, request.InternalRoleCode);

                    response.InformationMessage = InformationMessages.QuerySucceeded;
                }

                #endregion Operations

                return response;
            }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}