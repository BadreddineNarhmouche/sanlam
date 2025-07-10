using MediatR;
using SA.CheckTrackingPlatform.Common.Resources.Messages;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Responses;
using SA.CheckTrackingPlatform.ServiceEngines.Management.Mapper;
using System.Reflection;
using static System.Constants;

namespace SA.CheckTrackingPlatform.ServiceEngines.Management.Checkes.Queries
{
    public class GetAllByCriteriaQuery : BasePagedRequest<GetAllByCriteriaResponse>
    {
        #region properties

        public string? CheckNumbers { get; set; }
        public string? LotNumber { get; set; }
        public string? SinisterNumber { get; set; }
        public int? StatusId { get; set; }
        public bool CalculateTotalCount { get; set; } = true;
        public string? InternalUserElectronicAddress { get; set; }

        #endregion Properties 
    }


    public class GetAllByCriteriaQueryHandler : IRequestHandler<GetAllByCriteriaQuery, GetAllByCriteriaResponse>
    {
        #region Fields 

        private readonly IChecksQueryRepository checksQueryRepository;
        private readonly IInternalUserQueryRepository internalUserQueryRepository;
        private readonly IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository;

        #endregion Fields 

        #region Constructors 

        public GetAllByCriteriaQueryHandler(IChecksQueryRepository checksQueryRepository, IInternalUserQueryRepository internalUserQueryRepository, IInternalUserInternalRoleQueryRepository internalUserInternalRoleQueryRepository)
        {
            this.checksQueryRepository = checksQueryRepository;
            this.internalUserQueryRepository = internalUserQueryRepository;
            this.internalUserInternalRoleQueryRepository = internalUserInternalRoleQueryRepository;
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

                    IEnumerable<InternalUserInternalRole> internalUserInternalRoles = await internalUserInternalRoleQueryRepository.GetAllByInternalUserElectronicAddressAsync(request.InternalUserElectronicAddress);
                    bool IsUseService = false;

                    if (!internalUserInternalRoles.IsNullOrEmpty() && internalUserInternalRoles.Any(c => c.InternalRole.Label == InternalRoleCodes.ReceiptByBusinessUnit || c.InternalRole.Label == InternalRoleCodes.BoOut))
                    {
                        IsUseService = true;
                    }

                    var UserData = await internalUserQueryRepository.GetByElectronicAddressAsync(request.InternalUserElectronicAddress);

                    if (UserData.IsNotNull())
                    {
                        int totalCount = request.CalculateTotalCount ? await checksQueryRepository.CountAllByCriteriaAsync(request.CheckNumbers, request.LotNumber,
                            request.SinisterNumber, request.StatusId, IsUseService ? UserData.ServiceId : null) : 0;

                        IEnumerable<Checks> checks = await checksQueryRepository.GetByCriteriaAsync(request.CheckNumbers, request.LotNumber, request.SinisterNumber,
                            request.StatusId, request.PageIndex, 50, IsUseService ? UserData.ServiceId : null);

                        if (checks.IsNotNull())
                        {
                            response.Data = MappingConfiguration.Mapper.Map<List<GetAllByCriteriaItem>>(checks);
                            response.FillPageInformation(checks.Count(), totalCount, request.PageIndex, 50);
                        }

                        response.IsSuccess = true;
                        response.IsPopulated = checks.IsNotNull();
                        response.InformationMessage = InformationMessages.QuerySucceeded;
                    }
                }
                else
                {
                    response.IsSuccess = true;
                    response.IsPopulated = false;
                    response.WarningMessage = WarningMessages.QueryFailure;
                }

                #endregion Operations

                return response;
            }, MethodBase.GetCurrentMethod().ReflectedType.FullName, Assembly.GetExecutingAssembly().FullName, Guid.NewGuid().ToString(), request.CallerId);
        }

        #endregion Methods
    }
}
