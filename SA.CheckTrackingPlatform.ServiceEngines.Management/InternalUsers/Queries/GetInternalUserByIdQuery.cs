using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Queries
{
    public class GetInternalUserByIdQuery : BaseRequest<GetInternalUserByIdResponse>
    {
        #region Properties

        public int Id { get; set; }

        #endregion Properties
    }

    public class GetInternalUserByIdQueryHandler : IRequestHandler<GetInternalUserByIdQuery, GetInternalUserByIdResponse>
    {
        #region Fields

        private readonly IInternalUserQueryRepository internalUserQueryRepository;

        #endregion Fields

        #region Constructors

        public GetInternalUserByIdQueryHandler(IInternalUserQueryRepository internalUserQueryRepository)
        {
            this.internalUserQueryRepository = internalUserQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetInternalUserByIdResponse> Handle(GetInternalUserByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetInternalUserByIdResponse response = new GetInternalUserByIdResponse();

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
                    InternalUser internalUser = await internalUserQueryRepository.GetByIdAsync(request.Id);

                    if (internalUser.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetInternalUserByIdResponse>(internalUser);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = internalUser.IsNotNull();
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