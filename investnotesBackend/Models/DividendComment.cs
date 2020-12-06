using System;

namespace Models
{
    public class DividendComment 
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime Date { get; set; }

        public CommentRating Rating { get; set; }
        public double Value { get; set; }

        public double PercentValue { get; set; }
    }
}
