using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Queries
{
    public class GetKPIsCountQuery : BaseRequest<GetKPIsCountResponse>
    {
        #region properties

        #endregion Properties 
    }


    public class GetKPIsCountQueryHandler : IRequestHandler<GetKPIsCountQuery, GetKPIsCountResponse>
    {
        #region Fields 

        private readonly IBanksQueryRepository banksQueryRepository;
        

        #endregion Fields 

        #region Constructors 

        public GetKPIsCountQueryHandler(IBanksQueryRepository banksQueryRepository)
        {
            this.banksQueryRepository = banksQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetKPIsCountResponse> Handle(GetKPIsCountQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetKPIsCountResponse response = new GetKPIsCountResponse();

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


                    response.IsSuccess = true;
                   // response.IsPopulated = Bankes.IsNotNull();
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
