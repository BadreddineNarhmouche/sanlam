using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalRoles.Queries
{
    public class GetInternalRoleByCodeQuery : BaseRequest<GetInternalRoleByCodeResponse>
    {
        #region Properties

        public string Code { get; set; }

        #endregion Properties
    }

    public class GetInternalRoleByCodeQueryHandler : IRequestHandler<GetInternalRoleByCodeQuery, GetInternalRoleByCodeResponse>
    {
        #region Fields

        private readonly IInternalRoleQueryRepository internalRoleQueryRepository;

        #endregion Fields

        #region Constructors

        public GetInternalRoleByCodeQueryHandler(IInternalRoleQueryRepository internalRoleQueryRepository)
        {
            this.internalRoleQueryRepository = internalRoleQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetInternalRoleByCodeResponse> Handle(GetInternalRoleByCodeQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetInternalRoleByCodeResponse response = new GetInternalRoleByCodeResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.Code.IsNullOrEmpty())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.OneCriterionRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    InternalRole InternalRole = await internalRoleQueryRepository.GetByCodeAsync(request.Code);

                    if (InternalRole.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<GetInternalRoleByCodeResponse>(InternalRole);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = InternalRole.IsNotNull();
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