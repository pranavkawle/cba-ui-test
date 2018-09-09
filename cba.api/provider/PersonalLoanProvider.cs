using Domain;
using System.Collections.Generic;
using System.Linq;

namespace Provider
{
    public class PersonalLoanProvider : IPersonalLoanProvider
    {
        private readonly IDataSourceProvider<PersonalLoan> _dataSourceProvider;

        public PersonalLoanProvider(IDataSourceProvider<PersonalLoan> dataSourceProvider)
        {
            _dataSourceProvider = dataSourceProvider;
        }

        public IQueryable<PersonalLoan> GetAll()
        {
            return _dataSourceProvider.GetAll();
        }

        public bool Insert(PersonalLoan personalLoan)
        {
            var entities = GetAll().ToList();
            entities.Add(personalLoan);
            SaveAll(entities);
            return true;
        }

        public void SaveAll(IEnumerable<PersonalLoan> entities)
        {
            _dataSourceProvider.SaveAll(entities);
        }
    }
}
