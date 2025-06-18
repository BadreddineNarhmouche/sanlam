using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.BranchFolder.Queries
{
    public class GetBanchByIdQuery : BaseRequest<GetBranchByIdResponse>
    {
        #region properties

        public int Id { get; set; }

        #endregion Properties 
    }


    public class GetByIdQueryHandler : IRequestHandler<GetBanchByIdQuery, GetBranchByIdResponse>
    {
        #region Fields 

        private readonly IBranchsQueryRepository branchsQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetByIdQueryHandler(IBranchsQueryRepository branchsQueryRepository)
        {
            this.branchsQueryRepository = branchsQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetBranchByIdResponse> Handle(GetBanchByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetBranchByIdResponse response = new GetBranchByIdResponse();

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

                    Branch Branch = await branchsQueryRepository.GetByIdAsync(request.Id);

                    if (Branch.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetBranchByIdResponse>(Branch);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = Branch.IsNotNull();
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