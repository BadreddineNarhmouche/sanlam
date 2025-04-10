namespace SA.CheckTrackingPlatform.Domains.Common
{
    public interface IQueryRepository<TEntity> : IDisposable where TEntity : class, new()
    {
    }
}