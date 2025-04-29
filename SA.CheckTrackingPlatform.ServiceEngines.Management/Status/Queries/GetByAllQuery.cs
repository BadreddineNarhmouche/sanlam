using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Queries
{
    public class GetByAllQuery : BaseRequest<GetByAllResponse>
    {
        #region properties
        public List<int>? Ids { get; set; }
        public List<string>? CheckNumbers { get; set; }
        public int? BranchId { get; set; }
        public int? ServiceId { get; set; }
        public int? BankId { get; set; }
        public string? LotNumber { get; set; }
        public string? BeneficiaryName { get; set; }

        #endregion Properties 
    }


    public class GetByAllQueryHandler : IRequestHandler<GetByAllQuery, GetByAllResponse>
    {
        #region Fields 

        private readonly IStatusQueryRepository statusQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetByAllQueryHandler(IStatusQueryRepository statusQueryRepository)
        {
            this.statusQueryRepository = statusQueryRepository;
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

                    IEnumerable<Status> Statuses = await statusQueryRepository.GetByAllAsync();

                    if (Statuses.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetByAllItem>>(Statuses);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = Statuses.IsNotNull();
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
