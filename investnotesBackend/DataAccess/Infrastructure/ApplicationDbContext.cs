using Microsoft.EntityFrameworkCore;
using Models;

namespace DataAccess.Infrastructure
{
    public class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ApplicationDbContext(DbContextOptions<DbContext> options) : base(options)
        {

        }

        public DbSet<Industry> Industries { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<DividendComment> DividendComments { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<StockLink> StockLinks { get; set; }
    }
}
