using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Queries
{
    public class GetReasonMoveByIdQuery : BaseRequest<GetReasonMoveByIdResponse>
    {
        #region properties
        public int Id { get; set; }
        #endregion Properties 
    }

    public class GetReasonMoveByIdQueryHandler : IRequestHandler<GetReasonMoveByIdQuery, GetReasonMoveByIdResponse>
    {
        #region Fields 

        private readonly IReasonMovesQueryRepository reasonMovesQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetReasonMoveByIdQueryHandler(IReasonMovesQueryRepository reasonMovesQueryRepository)
        {
            this.reasonMovesQueryRepository = reasonMovesQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetReasonMoveByIdResponse> Handle(GetReasonMoveByIdQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetReasonMoveByIdResponse response = new GetReasonMoveByIdResponse();

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

                    ReasonMove reasonMove = await reasonMovesQueryRepository.GetReasonMoveByIdAsync(request.Id);

                    if (reasonMove.IsNotNull())
                    {
                        response = MappingConfiguration.Mapper.Map<GetReasonMoveByIdResponse>(reasonMove);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = reasonMove.IsNotNull();
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
