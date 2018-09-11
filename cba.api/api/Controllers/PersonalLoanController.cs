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
        [HttpGet("{name}", Name = "Get")]
        public PersonalLoan Get(string name)
        {
            return _personalLoanService.Get(name);
        }

        // POST: api/PersonalLoan
        [HttpPost]
        public JsonResult Post([FromBody] PersonalLoan personalLoan)
        {
            var result = _personalLoanService.Add(personalLoan);
            return new JsonResult(new
            {
                IsSuccess = result
            });
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
