using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderCart.Models
{
    public class SubmitModelDB : DbContext
    {
        public SubmitModelDB(DbContextOptions options):base(options)
        {

        }
          public DbSet<SubmitModel> Values { get; set; } 
    }
}
