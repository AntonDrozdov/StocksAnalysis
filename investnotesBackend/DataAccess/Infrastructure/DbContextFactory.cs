using DataAccess.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Infrastructure
{
    public class DbContextFactory : IDbContextFactory
    {
        public ApplicationDbContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
