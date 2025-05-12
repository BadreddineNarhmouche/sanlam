using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries
{
    public class GetChecksByIdQuery : BaseRequest<GetChecksByIdResponse>
    {
        #region properties

        public int Id { get; set; }

        #endregion Properties 
    }


    public class GetChecksByIdQueryHandler : IRequestHandler<GetChecksByIdQuery, GetChecksByIdResponse>
    {
        #region Fields 

        private readonly IChecksQueryRepository checksQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetChecksByIdQueryHandler(IChecksQueryRepository checksQueryRepository)
        {
            this.checksQueryRepository = checksQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetChecksByIdResponse> Handle(GetChecksByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetChecksByIdResponse response = new GetChecksByIdResponse();

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

                    Checks checks = await checksQueryRepository.GetByIdAsync(request.Id);

                    if (checks.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<GetChecksByIdResponse>(checks);
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