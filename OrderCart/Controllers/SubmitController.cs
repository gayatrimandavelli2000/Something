using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrderCart.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace OrderCart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmitController : ControllerBase

    {
        private readonly SubmitModelDB _DB;

        public SubmitController(SubmitModelDB db)
        {
            _DB = db;
        }
        [HttpPost("SubmitDetails")]
        public string SubmitDetail(SubmitModel request)
        {
            _DB.Values.Add(request);
            _DB.SaveChanges();
            return "Updated Successfully";
        }
    }
}
