using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;
namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries
{
    public class GetAllChecksQuery : BaseRequest<GetAllResponse>
    {
        #region properties

        public string? CheckNumbers { get; set; }
        public string? LotNumber { get; set; }
        public string? SinisterNumber { get; set; }
        public string? Status { get; set; }

        #endregion Properties 
    }


    public class GetAllChecksQueryHandler : IRequestHandler<GetAllChecksQuery, GetAllResponse>
    {
        #region Fields 

        private readonly IChecksQueryRepository checksQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetAllChecksQueryHandler(IChecksQueryRepository checksQueryRepository)
        {
            this.checksQueryRepository = checksQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetAllResponse> Handle(GetAllChecksQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllResponse response = new GetAllResponse();

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
                    IEnumerable<Checks> checks = await checksQueryRepository.GetAllAsync(request.CheckNumbers, request.LotNumber, request.SinisterNumber, request.Status);

                    if (checks.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<List<GetAllItem>>(checks);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = checks.IsNotNull();
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
