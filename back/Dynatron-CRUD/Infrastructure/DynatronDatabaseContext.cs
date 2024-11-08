using Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class DynatronDatabaseContext : DbContext
    {

        public DynatronDatabaseContext(DbContextOptions<DynatronDatabaseContext> options) : base(options) { }

        public DbSet<CustomerEntity> Customers { get; set; }

    }
}
