using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Queries
{
    public class GetAllInternalRolesQuery : BaseRequest<GetAllInternalRolesResponse>
    {
        #region Properties

        #endregion Properties
    }

    public class GetAllInternalRolesQueryHandler : IRequestHandler<GetAllInternalRolesQuery, GetAllInternalRolesResponse>
    {
        #region Fields

        private readonly IInternalRoleQueryRepository internalRoleQueryRepository;

        #endregion Fields

        #region Constructors

        public GetAllInternalRolesQueryHandler(IInternalRoleQueryRepository internalRoleQueryRepository)
        {
            this.internalRoleQueryRepository = internalRoleQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetAllInternalRolesResponse> Handle(GetAllInternalRolesQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllInternalRolesResponse response = new GetAllInternalRolesResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    IEnumerable<InternalRole> InternalRoles = await internalRoleQueryRepository.GetAllAsync();

                    if (!InternalRoles.IsNullOrEmpty())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetAllInternalRolesItem>>(InternalRoles);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = !InternalRoles.IsNullOrEmpty();
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