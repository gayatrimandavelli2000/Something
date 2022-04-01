using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderCart.Models
{
    public class SubmitModel
    {
        public string orderStatus { get; set; }
        public float totalPrice { get; set; }
        public List<ProductDetails> Products { get; set; }

    }

    public class ProductDetails
    {
        public int Id { get; set; }
        public string title { get; set; }
        public float price { get; set; }

        public int quantity { get; set; }

    }
}
