using Oracle.ManagedDataAccess.Client;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Helpers
{
    public static class OracleConnectionHelper
    {
        #region Properties

        public static string GISDatabaseConnectionString { get; set; }

        #endregion Properties

        #region Methods

        public static OracleConnection GetNew()
        {
            return new OracleConnection(GISDatabaseConnectionString);
        }

        #endregion Methods
    }
}
