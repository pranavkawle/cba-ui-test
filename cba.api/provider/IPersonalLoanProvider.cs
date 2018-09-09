using Domain;
using System.Collections.Generic;
using System.Linq;

namespace Provider
{
    public interface IPersonalLoanProvider
    {
        IQueryable<PersonalLoan> GetAll();
        void SaveAll(IEnumerable<PersonalLoan> entities);
        bool Insert(PersonalLoan personalLoan);
    }
}
