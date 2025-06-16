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
    public class GetReasonMoveByAllQuery : BaseRequest<GetReasonMoveByAllResponse>
    {
        #region properties

        #endregion Properties 
    }

    public class GetMoveByAllQueryHandler : IRequestHandler<GetReasonMoveByAllQuery, GetReasonMoveByAllResponse>
    {
        #region Fields 

        private readonly IReasonMovesQueryRepository reasonMovesQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetMoveByAllQueryHandler(IReasonMovesQueryRepository reasonMovesQueryRepository)
        {
            this.reasonMovesQueryRepository = reasonMovesQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetReasonMoveByAllResponse> Handle(GetReasonMoveByAllQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetReasonMoveByAllResponse response = new GetReasonMoveByAllResponse();

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

                    IEnumerable<ReasonMove> ReasonMoves = await reasonMovesQueryRepository.GetAllReasonMovesAsync();

                    if (ReasonMoves.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<IEnumerable<GetReasonMoveByAllItem>>(ReasonMoves);
                    }

                    response.IsSuccess = true;
                    response.IsPopulated = ReasonMoves.IsNotNull();
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
