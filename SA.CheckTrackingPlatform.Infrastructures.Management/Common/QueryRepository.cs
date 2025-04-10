using SA.CheckTrackingPlatform.Domains.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Common
{
    public class QueryRepository<TEntity> : IQueryRepository<TEntity> where TEntity : class, new()
    {
        #region Constructors

        public QueryRepository()
        {
        }

        #endregion Constructors

        #region IDisposable Support

        private bool disposedValue = false;

        ~QueryRepository()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                }

                disposedValue = true;
            }
        }

        #endregion IDisposable Support
    }
}