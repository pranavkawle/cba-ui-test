using System.Collections.Generic;
using Domain;

namespace Service
{
    public interface IPersonalLoanService
    {
        bool Add(PersonalLoan personalLoan);
        PersonalLoan Get(int id);
        IEnumerable<PersonalLoan> GetAll();
    }
}