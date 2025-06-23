using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using PdfSharpCore;
using SA.CheckTrackingPlatform.Contexts.Management.Application;
using SA.CheckTrackingPlatform.Domains.Management.Entities;
using SA.CheckTrackingPlatform.Domains.Management.Repositories.Queries;
using SA.CheckTrackingPlatform.Infrastructures.Management.Common;
using SA.CheckTrackingPlatform.ServiceEngines.Management.KPIs.Responses;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Repositories.Queries
{
    public class TimelineQueryRepository : QueryRepository<Timeline>, ITimelinesQueryRepository
    {
        #region Fields 
        protected readonly ApplicationContext applicationContext;
        private readonly IConfiguration configuration;

        #endregion Fields


        #region Constructors 
        public TimelineQueryRepository(ApplicationContext applicationContext, IConfiguration configuration) : base()
        {
            this.applicationContext = applicationContext;
            this.configuration = configuration;
        }
        #endregion Constructors


        #region Methods

        public async Task<Timeline> GetTimelineByIdAsync(int id)
        {
            Timeline query = await this.applicationContext.Timelines 
                    .AsNoTrackingWithIdentityResolution()
                    .SingleOrDefaultAsync(o => o.Id == id);

            return query;
        }

        public async Task<IEnumerable<Timeline>> GetTimelinesByCriteriaAsync(List<int>? ids, List<int>? ChecksIds, List<int>? UserIds, int? statusId, string? reasonlabel , int? pageIndex = null, int? pageSize = null)
        {
            IQueryable<Timeline> query = this.applicationContext.Timelines
                .AsNoTrackingWithIdentityResolution();


            if (ids != null && ids.Any())
                query = query.Where(c => ids.Contains(c.Id));

            if (ChecksIds != null && ChecksIds.Any())
                query = query.Where(c => ChecksIds.Contains(c.CheckId));

            if (UserIds != null && UserIds.Any())
                query = query.Where(c => UserIds.Contains(c.UserId));

            if (statusId.HasValue)
                query = query.Where(c => c.StatusId == statusId.Value);

            //if (!string.IsNullOrWhiteSpace(reasonlabel))
            //    query = query.Where(c => c.ReasonLabel == reasonlabel);


            if (pageIndex.HasValue && pageSize.HasValue)
            {
                int skip = pageIndex.Value * pageSize.Value;
                query = query.Skip(skip).Take(pageSize.Value);
            }

            return await query.ToListAsync();
        }


        public async Task<int> GetKpiCountAsync(string statutFinal, List<string> statutsExclus)
        {
            var inParams = statutsExclus.Select((_, i) => $":p{i}").ToList();
            string inClause = string.Join(", ", inParams);

            string query = $@"
    WITH DernierTimeline AS (
        SELECT 
            t.""CheckId"",
            t.""StatusId"",
            ROW_NUMBER() OVER (
                PARTITION BY t.""CheckId"" 
                ORDER BY t.""DateOfPassage"" DESC, t.""Id"" DESC
            ) AS rn
        FROM ""Timelines"" t
    )
    SELECT COUNT(*) AS ""Count""
    FROM DernierTimeline dt
    INNER JOIN ""Statuses"" s ON dt.""StatusId"" = s.""Id""
    WHERE dt.rn = 1
      AND s.""Label"" = :statutFinal
      AND NOT EXISTS (
          SELECT 1
          FROM ""Timelines"" t2
          INNER JOIN ""Statuses"" s2 ON t2.""StatusId"" = s2.""Id""
          WHERE t2.""CheckId"" = dt.""CheckId""
            AND s2.""Label"" IN ({inClause})
      )
    ";

            string connectionString = configuration.GetConnectionString("OracleDatabase");
            using (var connection = new OracleConnection(connectionString))
            {
                await connection.OpenAsync();

                var parameters = new DynamicParameters();
                parameters.Add("statutFinal", statutFinal);

                for (int i = 0; i < statutsExclus.Count; i++)
                {
                    parameters.Add($"p{i}", statutsExclus[i]);
                }

                int count = await connection.ExecuteScalarAsync<int>(query, parameters);
                return count;
            }
        }


        #endregion Methods
    }
}
