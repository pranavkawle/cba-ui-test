using System.Collections.Generic;
using System.Linq;

namespace Provider
{
    public interface IDataSourceProvider<T> where T : class
    {
        IQueryable<T> GetAll();
        void SaveAll(IEnumerable<T> entities);
    }
}