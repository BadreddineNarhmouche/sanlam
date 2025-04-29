using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Queries
{
    public class GetByAllQuery : BaseRequest<GetByAllResponse>
    {
        #region properties

        #endregion Properties 
    }


    public class GetByAllQueryHandler : IRequestHandler<GetByAllQuery, GetByAllResponse>
    {
        #region Fields 

        private readonly IBranchsQueryRepository branchsQueryRepository;
        
        

        #endregion Fields 

        #region Constructors 

        public GetByAllQueryHandler(IBranchsQueryRepository branchsQueryRepository)
        {
            this.branchsQueryRepository = branchsQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetByAllResponse> Handle(GetByAllQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetByAllResponse response = new GetByAllResponse();

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

                    IEnumerable<Branch> Branches = await branchsQueryRepository.GetByAllAsync();

                    if (Branches.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetByAllItem>>(Branches);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = Branches.IsNotNull();
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
