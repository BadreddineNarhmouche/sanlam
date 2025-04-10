using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUserInternalRoles.Queries
{
    public class GetAllInternalUserInternalRolesByInternalUserIdQuery : BaseRequest<GetAllInternalUserInternalRolesByInternalUserIdResponse>
    {
        #region Properties

        public int InternalUserId { get; set; }

        #endregion Properties
    }

    public class GetAllInternalUserInternalRolesByInternalUserIdQueryHandler : IRequestHandler<GetAllInternalUserInternalRolesByInternalUserIdQuery, GetAllInternalUserInternalRolesByInternalUserIdResponse>
    {
        #region Fields

        private readonly IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository;

        #endregion Fields

        #region Constructors

        public GetAllInternalUserInternalRolesByInternalUserIdQueryHandler(IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository)
        {
            this.internalUserInternalRoleQueryRepository = internalUserInternalRoleQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetAllInternalUserInternalRolesByInternalUserIdResponse> Handle(GetAllInternalUserInternalRolesByInternalUserIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllInternalUserInternalRolesByInternalUserIdResponse response = new GetAllInternalUserInternalRolesByInternalUserIdResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.InternalUserId <= 0)
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.OneCriterionRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    IEnumerable<InternalUserInternalRole> internalUserInternalRoles = await internalUserInternalRoleQueryRepository.GetAllByInternalUserIdAsync(request.InternalUserId, false);

                    if (!internalUserInternalRoles.IsNullOrEmpty())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetAllInternalUserInternalRolesByInternalUserIdItem>>(internalUserInternalRoles);
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