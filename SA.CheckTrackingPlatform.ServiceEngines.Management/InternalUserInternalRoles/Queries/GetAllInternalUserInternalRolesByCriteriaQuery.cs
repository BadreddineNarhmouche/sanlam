using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Queries
{
    public class GetAllInternalUserInternalRolesByCriteriaQuery : BaseRequest<GetAllInternalUserInternalRolesByCriteriaResponse>
    {
        #region Properties

        public int? InternalUserId { get; set; }

        public int? InternalRoleId { get; set; }

        #endregion Properties
    }

    public class GetAllInternalUserInternalRolesByCriteriaQueryHandler : IRequestHandler<GetAllInternalUserInternalRolesByCriteriaQuery, GetAllInternalUserInternalRolesByCriteriaResponse>
    {
        #region Fields

        private readonly IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository;

        #endregion Fields

        #region Constructors

        public GetAllInternalUserInternalRolesByCriteriaQueryHandler(IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository)
        {
            this.internalUserInternalRoleQueryRepository = internalUserInternalRoleQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetAllInternalUserInternalRolesByCriteriaResponse> Handle(GetAllInternalUserInternalRolesByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllInternalUserInternalRolesByCriteriaResponse response = new GetAllInternalUserInternalRolesByCriteriaResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (!request.InternalUserId.HasValue && !request.InternalRoleId.HasValue)
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.OneCriterionRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    IEnumerable<InternalUserInternalRole> internalUserInternalRoles = await internalUserInternalRoleQueryRepository.GetAllByCriteriaAsync(request.InternalRoleId, request.InternalUserId);

                    if (!internalUserInternalRoles.IsNullOrEmpty())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetAllInternalUserInternalRolesByCriteriaItem>>(internalUserInternalRoles);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = !internalUserInternalRoles.IsNullOrEmpty();
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