using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BanksFolder.Queries
{
    public class GetBankByIdQuery : BaseRequest<GetBankByIdResponse>
    {
        #region properties

        public int Id { get; set; }

        #endregion Properties 
    }


    public class GetByIdQueryHandler : IRequestHandler<GetBankByIdQuery, GetBankByIdResponse>
    {
        #region Fields 

        private readonly IBanksQueryRepository banksQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetByIdQueryHandler(IBanksQueryRepository banksQueryRepository)
        {
            this.banksQueryRepository = banksQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetBankByIdResponse> Handle(GetBankByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetBankByIdResponse response = new GetBankByIdResponse();

                #endregion Declarations

                #region Validations

                if (request.IsNotValid())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.QueryRequired;

                    return response;
                }

                if (request.Id <= 0 || request.Id.IsNull())
                {
                    response.IsSuccess = false;
                    response.WarningMessage = WarningMessages.AllCriteriaRequired;

                    return response;
                }

                #endregion Validations

                #region Operations

                if (response.IsSuccess)
                {

                    Bank Bank = await banksQueryRepository.GetByIdAsync(request.Id);

                    if (Bank.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetBankByIdResponse>(Bank);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = Bank.IsNotNull();
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