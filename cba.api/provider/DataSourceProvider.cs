using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Provider
{
    public class DataSourceProvider<T> : IDataSourceProvider<T> where T : class
    {
        public readonly string _filePath;

        public DataSourceProvider()
        {
            var type = typeof(T).Name;
            _filePath = GetFullFilePath(type);
            CreateSource(type);
        }

        private string GetFullFilePath(string fileNameWithoutExtension)
        {
            return $"{fileNameWithoutExtension}.json";
        }

        private void CreateSource(string type)
        {
            if (!File.Exists(type))
            {
                var stream = File.Create(_filePath);
                stream.Close();
            }
        }

        public IQueryable<T> GetAll()
        {
            var content = File.ReadAllText(_filePath);
            var data = JsonConvert.DeserializeObject<IEnumerable<T>>(content);

            if (data != null)
            {
                return data.AsQueryable();
            }

            return null;
        }

        public void SaveAll(IEnumerable<T> entities)
        {
            var content = JsonConvert.SerializeObject(entities);
            File.WriteAllText(_filePath, content);
        }
    }
}
