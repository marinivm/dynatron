
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Entities;

namespace Domain.Service.Interfaces
{
    public interface ICustomerService
    {
        public List<CustomerEntity> List();

        public CustomerEntity? GetOne(int id);

        public int Create(CustomerEntity model);

        public void Update(CustomerEntity model);

        public void Delete(int id);
        

    }
}
