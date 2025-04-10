namespace System
{
    public static class IQueryable
    {
        /// <summary>
        /// Add pagination to the IQueryable source
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"> Queryable input</param>
        /// <param name="pageIndex"> Page index, the first page has a pageIndex=1</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>Paged queryable result</returns>
        public static IQueryable<T> ToPaged<T>(this IQueryable<T> source, int pageIndex, int pageSize)
        {
            int page = pageIndex < 1 ? 0 : pageIndex - 1;
            return source.Skip(page * pageSize).Take(pageSize);
        }
    }
}