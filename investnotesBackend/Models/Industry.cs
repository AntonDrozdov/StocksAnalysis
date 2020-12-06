using System.Collections.Generic;

namespace Models
{
    public class Industry
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public IEnumerable<Stock> Stocks{ get; set; }
    }
}
