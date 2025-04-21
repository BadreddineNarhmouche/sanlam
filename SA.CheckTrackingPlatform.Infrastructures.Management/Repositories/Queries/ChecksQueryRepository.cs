using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class ChecksQueryRepository : QueryRepository<Checks>, IChecksQueryRepository
    {
        #region Fields 

        protected readonly ApplicationContext applicationContext;

        #endregion Fields 

        #region Constructors 

        public ChecksQueryRepository(ApplicationContext applicationContext) : base()
        {
            this.applicationContext = applicationContext;
        }

        #endregion Constructors

        #region Methods 

        public async Task<Checks> GetByIdAsync(int id)
        {
            //return await Task.Run(async () =>
            //{
            //    Dictionary<string, object> parameters = null;

            //    string commandText = BuildCommandText(CommandTexts.GetAllChecksByCriteria, identifiers,
            //        null, null, null, null, null, out parameters, pageIndex, pageSize);

            //    List<Checks> checks = new List<Checks>();

            //    OracleConnection oracleConnection = OracleConnectionHelper.GetNew();
            //    try
            //    {
            //        using (DataTable dataTable = DatabaseExecutionHelper.ExecuteQuery(oracleConnection, null, commandText, CommandType.Text, parameters))
            //        {
            //            foreach (DataRow dataRow in dataTable.Rows)
            //            {
            //                quittances.Add(Quittance.MapFromDataRowForGetAllByIdentifiers(dataRow));
            //            }
            //        }
            //    }
            //    catch (Exception ex)
            //    {

            //        throw ex;
            //    }

            //    return quittances;
            //});

            return null;
        }

        public async Task<IEnumerable<Checks>> GetByCriteriaAsync(List<int>? ids, List<string>? checkNumbers, int? branchId, int? serviceId, int? bankId, string? lotNumber, string? beneficiaryName, int? pageIndex = null, int? pageSize = null)
        {
            return await Task.Run(async () =>
            {

                List<Checks> checks = new List<Checks>();
                return checks;
            });
        }
        #endregion
    }
}