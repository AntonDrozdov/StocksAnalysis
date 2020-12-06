using System.Collections.Generic;

namespace Models
{
    public class Stock
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Ticker { get; set; }

        public Industry Industry { get; set; }
        
        public int IndustryId { get; set; }
        
        public ICollection<Comment> Comments { get; set; }

        //public ICollection<DividendComment> DividendComments { get; set; }

        //public ICollection<Tag> Tags { get; set; }

        //public ICollection<StockLink> Links { get; set; }
    }
}
