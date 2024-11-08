using Domain.Service.Interfaces;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public List<CustomerEntity> Get()
        {
            return _customerService.List();
        }

        // GET api/<CustomerController>/5
        [HttpGet("{id}")]
        public CustomerEntity Get(int id)
        {
            return _customerService.GetOne(id);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public int Post([FromBody] CustomerEntity model)
        {
            return _customerService.Create(model);
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CustomerEntity model)
        {
            _customerService.Update(model);
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _customerService.Delete(id);
        }
    }
}
