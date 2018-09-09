using System;

namespace Domain
{
    public class Log
    {
        public DateTime When { get; set; }
        public string What { get; set; }
        public string Where { get; set; }
        public string MoreDetails { get; set; }
    }
}
