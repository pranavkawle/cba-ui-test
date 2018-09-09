using Domain;
using Microsoft.AspNetCore.Mvc;
using Service;
using System;
using System.Collections.Generic;

namespace api.Controllers
{
    [Route("api/personal-loan")]
    [ApiController]
    public class PersonalLoanController : ControllerBase
    {
        private readonly IPersonalLoanService _personalLoanService;

        public PersonalLoanController(IPersonalLoanService personalLoanService)
        {
            _personalLoanService = personalLoanService;
        }

        // GET: api/PersonalLoan
        [HttpGet]
        public IEnumerable<PersonalLoan> Get()
        {
            return _personalLoanService.GetAll();
        }

        // GET: api/PersonalLoan/5
        [HttpGet("{id}", Name = "Get")]
        public PersonalLoan Get(int id)
        {
            return _personalLoanService.Get(id);
        }

        // POST: api/PersonalLoan
        [HttpPost]
        public void Post([FromBody] PersonalLoan personalLoan)
        {
            _personalLoanService.Add(personalLoan);
        }

        // PUT: api/PersonalLoan/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            throw new NotImplementedException();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
