using Domain.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Entities;
using Infrastructure;

namespace Domain.Service.Concrete
{
    public class CustomerService : ICustomerService
    {
        private readonly DynatronDatabaseContext _dbcontext;

        public CustomerService(DynatronDatabaseContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public int Create(CustomerEntity model)
        {
            CustomerEntity? customer = _dbcontext.Customers.FirstOrDefault(x =>
            x.FirstName.ToLower() == model.FirstName.ToLower()
            && x.LastName.ToLower() == model.LastName.ToLower()
            && x.Email.ToLower() == model.Email.ToLower());

            if (customer == null)
            {
                _dbcontext.Customers.Add(model);
                _dbcontext.SaveChanges();
            }

            return model.Id;
        }

        public void Delete(int id)
        {
            CustomerEntity? item = GetOne(id);
            if (item != null)
            {
                _dbcontext.Customers.Remove(item);
                _dbcontext.SaveChanges();
            }
        }

        public CustomerEntity? GetOne(int id)
        {
            return _dbcontext.Customers.FirstOrDefault(x => x.Id == id);
        }

        public List<CustomerEntity> List()
        {
            return _dbcontext.Customers.OrderByDescending(x => x.CreatedTime).ToList();
        }

        public void Update(CustomerEntity model)
        {
            var item = _dbcontext.Customers.Find(model.Id);
            item.FirstName = model.FirstName;
            item.LastName = model.LastName;
            item.Email = model.Email;
            item.LastUpdate = DateTime.Now;
            
            _dbcontext.SaveChanges();

        }
    }
}
