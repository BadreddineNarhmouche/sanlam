using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Responses;
using System.Reflection;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.StatusFolder.Queries
{
    public class GetStatusByAllQuery : BaseRequest<GetStatusByAllResponse>
    {
        #region properties

        #endregion Properties 
    }


    public class GetByAllQueryHandler : IRequestHandler<GetStatusByAllQuery, GetStatusByAllResponse>
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

        public async Task<GetStatusByAllResponse> Handle(GetStatusByAllQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetStatusByAllResponse response = new GetStatusByAllResponse();

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
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetStatusByAllItem>>(Statuses);
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
