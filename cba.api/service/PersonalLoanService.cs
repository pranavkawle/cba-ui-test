using Domain;
using Provider;
using System.Linq;
using System.Collections.Generic;
using System;

namespace Service
{
    public class PersonalLoanService : IPersonalLoanService
    {
        private readonly ILogProvider _logProvider;
        private readonly IPersonalLoanProvider _personalLoanProvider;

        public PersonalLoanService(ILogProvider logProvider, IPersonalLoanProvider personalLoanProvider)
        {
            _logProvider = logProvider;
            _personalLoanProvider = personalLoanProvider;
        }

        public PersonalLoan Get(string name)
        {
            try
            {
                return _personalLoanProvider.GetAll().Single(personalLoan => personalLoan.Name == name);
            }
            catch (Exception ex)
            {
                var log = _logProvider.Format(ex);
                _logProvider.Append(log);
                return null;
            }
        }

        public IEnumerable<PersonalLoan> GetAll() => _personalLoanProvider.GetAll() ?? new List<PersonalLoan>().AsQueryable();

        public bool Add(PersonalLoan personalLoan)
        {
            try
            {
                _personalLoanProvider.Insert(personalLoan);
            }
            catch (Exception ex)
            {
                var log = _logProvider.Format(ex);
                _logProvider.Append(log);
                return false;
            }
            return true;
        }
    }
}
