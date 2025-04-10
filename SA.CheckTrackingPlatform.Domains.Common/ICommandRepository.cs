namespace SA.CheckTrackingPlatform.Domains.Common
{
    public interface ICommandRepository<TEntity> : IDisposable where TEntity : class, new()
    {
        #region Methods

        Task<TEntity> AddAsync(TEntity entity);

        Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities);

        Task<TEntity> UpdateAsync(TEntity entity);

        Task<IEnumerable<TEntity>> UpdateRangeAsync(IEnumerable<TEntity> entities);

        Task DeleteAsync(TEntity entity);

        Task DeleteRangeAsync(IEnumerable<TEntity> entities);

        #endregion Methods
    }
}