using System;
using System.Collections.Generic;

namespace Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int? StockId { get; set; }
        public Stock Stock { get; set; }

        public string Content { get; set; }

        public DateTime Date { get; set; }

        public CommentRating Rating {get;set;}


    }
}
