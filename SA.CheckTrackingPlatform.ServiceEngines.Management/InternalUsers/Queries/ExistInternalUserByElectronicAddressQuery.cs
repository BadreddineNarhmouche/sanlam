using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.InternalUsers.Queries
{
    public class ExistInternalUserByElectronicAddressQuery : BaseRequest<ExistInternalUserByElectronicAddressResponse>
    {
        #region Properties

        public string? InternalUserElectronicAddress { get; set; }

        #endregion Properties
    }

    public class ExistInternalUserByElectronicAddressQueryHandler : IRequestHandler<ExistInternalUserByElectronicAddressQuery, ExistInternalUserByElectronicAddressResponse>
    {
        #region Fields

        private readonly IInternalUserQueryRepository internalUserQueryRepository;

        #endregion Fields

        #region Constructors

        public ExistInternalUserByElectronicAddressQueryHandler(IInternalUserQueryRepository internalUserQueryRepository)
        {
            this.internalUserQueryRepository = internalUserQueryRepository;
        }

        #endregion Constructors

        #region Methods

        public async Task<ExistInternalUserByElectronicAddressResponse> Handle(ExistInternalUserByElectronicAddressQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                ExistInternalUserByElectronicAddressResponse response = new ExistInternalUserByElectronicAddressResponse();

                #endregion Declarations

                #region Validations

                if (request.InternalUserElectronicAddress.IsNullOrWhiteSpace())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.AllCriteriaRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {
                    response.IsFound = await internalUserQueryRepository.ExistByElectronicAddressAsync(request.InternalUserElectronicAddress);

                    response.InformationMessage = InformationMessages.QuerySucceeded;
                }

                #endregion Operations

                return response;
            }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}