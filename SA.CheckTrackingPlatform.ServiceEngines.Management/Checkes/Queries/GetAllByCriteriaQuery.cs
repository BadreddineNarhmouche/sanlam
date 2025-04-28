using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries
{
    public class GetAllByCriteriaQuery : BaseRequest<GetAllByCriteriaResponse>
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


    public class GetAllByCriteriaQueryHandler : IRequestHandler<GetAllByCriteriaQuery, GetAllByCriteriaResponse>
    {
        #region Fields 

        private readonly IChecksQueryRepository checksQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetAllByCriteriaQueryHandler(IChecksQueryRepository checksQueryRepository)
        {
            this.checksQueryRepository = checksQueryRepository;
        }

        #endregion Constructors 

        #region Methods 

        public async Task<GetAllByCriteriaResponse> Handle(GetAllByCriteriaQuery request, CancellationToken cancellationToken)
        {
            return await ExecutionHelper.Proceed(async () =>
            {
                #region Declarations

                GetAllByCriteriaResponse response = new GetAllByCriteriaResponse();

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
                    //paramétrage count 1 => Non Vide
                    IEnumerable<Checks> checks = await checksQueryRepository.GetByCriteriaAsync(request.Ids, request.CheckNumbers, request.BranchId,
                        request.ServiceId, request.BankId, request.LotNumber, request.BeneficiaryName);

                    if (checks.IsNotNull())
                    {
                        response.Data = MappingConfiguration.Mapper.Map<List<GetAllByCriteriaItem>>(checks);
                                                // Data reçoit les elements et Mapping avec une list des entitées des checks 
                           // Car Nous voulons Mapper une liste avec une liste et nous voulons retourner tout les items de checks 
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
