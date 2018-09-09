using System;

namespace Provider
{
    public interface ILogProvider
    {
        string Format(Exception exception);
        void Append(string logEntry);
    }
}