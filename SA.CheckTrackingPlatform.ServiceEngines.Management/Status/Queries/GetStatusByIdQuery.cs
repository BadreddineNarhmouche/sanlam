using System.Reflection;
using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Queries
{
    public class GetStatusByIdQuery : BaseRequest<GetStatusByIdResponse>
    {
        #region properties

        public int Id { get; set; }

        #endregion Properties 
    }


    public class GetStatusByIdQueryHandler : IRequestHandler<GetStatusByIdQuery, GetStatusByIdResponse>
    {
        #region Fields 

        private readonly IStatusQueryRepository statusQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetStatusByIdQueryHandler(IStatusQueryRepository statusQueryRepository)
        {
            this.statusQueryRepository = statusQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetStatusByIdResponse> Handle(GetStatusByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetStatusByIdResponse response = new GetStatusByIdResponse();

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

                    Status status = await statusQueryRepository.GetByIdAsync(request.Id);

                    if (status.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetStatusByIdResponse>(status);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = status.IsNotNull();
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