using Microsoft.EntityFrameworkCore;
using SA.CheckTrackingPlatform.Domains.Common;

namespace SA.CheckTrackingPlatform.Infrastructures.Management.Common
{
    public class CommandRepository<TEntity> : ICommandRepository<TEntity> where TEntity : class, new()
    {
        #region Fields

        protected readonly DbContext context;

        #endregion Fields

        #region Constructors

        public CommandRepository(DbContext context)
        {
            this.context = context;
        }

        #endregion Constructors

        #region Methods

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            this.context.Entry(entity).State = EntityState.Added;
            await this.context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await this.context.Set<TEntity>().AddRangeAsync(entities);
            await this.context.SaveChangesAsync();

            return entities;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            this.context.Entry(entity).State = EntityState.Modified;
            await this.context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> UpdateRangeAsync(IEnumerable<TEntity> entities)
        {
            this.context.Set<TEntity>().UpdateRange(entities);
            await this.context.SaveChangesAsync();

            return entities;
        }

        public virtual async Task DeleteAsync(TEntity entity)
        {
            this.context.Set<TEntity>().Remove(entity);
            await this.context.SaveChangesAsync();
        }

        public virtual async Task DeleteRangeAsync(IEnumerable<TEntity> entities)
        {
            this.context.Set<TEntity>().RemoveRange(entities);
            await this.context.SaveChangesAsync();
        }

        #endregion Methods

        #region IDisposable Support

        private bool disposedValue = false;

        ~CommandRepository()
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
                    if (this.context.IsNotNull())
                    {
                        this.context.Dispose();
                    }
                }

                disposedValue = true;
            }
        }

        #endregion IDisposable Support
    }
}