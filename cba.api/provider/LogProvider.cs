using System;
using Domain;
using Newtonsoft.Json;

namespace Provider
{
    class LogProvider : ILogProvider
    {
        private readonly IDataSourceProvider<Log> _dataSourceProvider;

        public LogProvider(IDataSourceProvider<Log> dataSourceProvider)
        {
            _dataSourceProvider = dataSourceProvider;
        }

        public void Append(string logEntry)
        {
            // Append log entry here
        }

        public string Format(Exception exception)
        {
            var log = new Log
            {
                When = DateTime.Now,
                What = exception.Message,
                Where = exception.Source,
                MoreDetails = exception.StackTrace
            };

            return JsonConvert.SerializeObject(log);
        }
    }
}
