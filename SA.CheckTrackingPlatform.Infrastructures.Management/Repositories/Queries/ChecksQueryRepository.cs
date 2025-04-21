using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ICSharpCode.SharpZipLib.Zip;
using MailKit;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
using PdfSharpCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;
using SA.CheckTrackingPlatform.Infrastructures.Management.Constants;
using SA.CheckTrackingPlatform.Infrastructures.Management.Helpers;

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

        public async Task<IEnumerable<Checks>> GetByCriteriaAsync(List<int>? ids, List<string>? checkNumbers, int? branchId, int? serviceId, int? bankId, 
            string? lotNumber, string? beneficiaryName, int? pageIndex = null, int? pageSize = null)
        {
            return await Task.Run(async () =>
            {
                Dictionary<string, object> parameters = null;

                string commandText = BuildCommandText(CommandTexts.GetAllChecksByCriteria, ids, checkNumbers, branchId, serviceId, bankId, 
                    lotNumber, beneficiaryName, out parameters, pageIndex, pageSize);

                List<Checks> checks = new List<Checks>();

                OracleConnection oracleConnection = OracleConnectionHelper.GetNew();
                try
                {
                    using (DataTable dataTable = DatabaseExecutionHelper.ExecuteQuery(oracleConnection, null, commandText, CommandType.Text, parameters))
                    {
                        foreach (DataRow dataRow in dataTable.Rows)
                        {
                            checks.Add(Checks.MapFromDataRowForGetAllByCriteria(dataRow));
                        }
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }

                return checks;
            });
        }

        protected string BuildCommandText(string selectCommand, List<int>? ids, List<string>? checkNumbers,
            int? branchId, int? serviceId, int? bankId, string? lotNumber, string? beneficiaryName,
            out Dictionary<string, object> parameters, int? pageIndex = null, int? pageSize = null)
        {
            parameters = new Dictionary<string, object>();
            List<string> commandTextConditions = new List<string>();

            if (!ids.IsNull())
            {
                StringBuilder sb = new StringBuilder();

                foreach (int identifier in ids)
                {
                    sb.Append("" + identifier.ToString() + ",");
                }

                string IdentifierList = sb.ToString().TrimEnd(',');

                if (!selectCommand.Contains("WHERE"))
                {
                    selectCommand = selectCommand + " WHERE ";
                }
                else
                {
                    selectCommand = selectCommand + " AND ";
                }
                selectCommand = selectCommand + "( ID IN (" + IdentifierList + ") )";
            }

            if (!checkNumbers.IsNull())
            {
                StringBuilder sb = new StringBuilder();

                foreach (string identifier in checkNumbers)
                {
                    sb.Append("'" + identifier.ToString() + "',");
                }

                string IdentifierList = sb.ToString().TrimEnd(',');

                if (!selectCommand.Contains("WHERE"))
                {
                    selectCommand = selectCommand + " WHERE ";
                }
                else
                {
                    selectCommand = selectCommand + " AND ";
                }
                selectCommand = selectCommand + "( CHECKNUMBER IN (" + IdentifierList + ") )";
            }

            if (branchId.HasValue)
            {
                parameters.Add("@BranchId", branchId);
                commandTextConditions.Add(" ( BranchId = :BranchId ) ");
            }

            if (serviceId.HasValue)
            {
                parameters.Add("@ServiceId", serviceId);
                commandTextConditions.Add(" ( ServiceId = :ServiceId ) ");
            }

            if (bankId.HasValue)
            {
                parameters.Add("@BankId", bankId);
                commandTextConditions.Add(" ( BankId = :BankId ) ");
            }

            if (!lotNumber.IsNullOrWhiteSpace())
            {
                parameters.Add("@LotNumber", lotNumber);
                commandTextConditions.Add(" ( LotNumber = :LotNumber ) ");
            }

            if (!beneficiaryName.IsNullOrWhiteSpace())
            {
                parameters.Add("@BeneficiaryName", beneficiaryName);
                commandTextConditions.Add(" ( BeneficiaryName = :BeneficiaryName ) ");
            }
           
            return selectCommand;
            //if (pageIndex.HasValue && pageSize.HasValue)
            //{
            //    parameters.Add(":PageIndex", pageIndex);
            //    parameters.Add(":PageSize", pageSize);

            //    return selectCommand.BuildPagedCommandText(AISConstants.CommandTexts.Templates.PagedByCriteria_ROWNUM);
            //}
            //else
            //{
            //    return selectCommand;
            //}
        }

        #endregion
    }
}