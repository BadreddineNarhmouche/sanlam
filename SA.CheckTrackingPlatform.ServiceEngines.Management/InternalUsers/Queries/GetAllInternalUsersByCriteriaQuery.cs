using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Queries
{
    public class GetAllInternalUsersByCriteriaQuery : BaseRequest<GetAllInternalUsersByCriteriaResponse>
    {
        #region Properties

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? ElectronicAddress { get; set; }

        public string? InternalRoleCode { get; set; }

        public DateTime? FromCreationDate { get; set; }

        public DateTime? ToCreationDate { get; set; }

        #endregion Properties
    }

    public class GetAllInternalUsersByCriteriaQueryHandler : IRequestHandler<GetAllInternalUsersByCriteriaQuery, GetAllInternalUsersByCriteriaResponse>
    {
        #region Fields

        private readonly IInternalUserQueryRepository internalUserQueryRepository;

        #endregion Fields

        #region Constructors

        public GetAllInternalUsersByCriteriaQueryHandler(IInternalUserQueryRepository internalUserQueryRepository)
        {
            this.internalUserQueryRepository = internalUserQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<GetAllInternalUsersByCriteriaResponse> Handle(GetAllInternalUsersByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllInternalUsersByCriteriaResponse response = new GetAllInternalUsersByCriteriaResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.FirstName.IsNullOrWhiteSpace() &&
                request.LastName.IsNullOrWhiteSpace() &&
                request.ElectronicAddress.IsNullOrWhiteSpace() &&
                request.InternalRoleCode.IsNullOrWhiteSpace() &&
                request.FromCreationDate.IsNull() &&
                request.ToCreationDate.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.OneCriterionRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    IEnumerable<InternalUser> internalUsers = await internalUserQueryRepository.GetAllByCriteriaAsync(request.FirstName, request.LastName, request.ElectronicAddress, request.InternalRoleCode, request.FromCreationDate, request.ToCreationDate);

                    if (!internalUsers.IsNullOrEmpty())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetAllInternalUsersByCriteriaItem>>(internalUsers);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = !internalUsers.IsNullOrEmpty();
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