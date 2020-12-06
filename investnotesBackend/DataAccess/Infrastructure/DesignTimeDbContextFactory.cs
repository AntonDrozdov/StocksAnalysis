using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DataAccess.Infrastructure
{
    public class DesignTimeDbContextFactory :
        IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var config = builder.Build();
            var connectionString = config.GetConnectionString("DefaultConnection");
            var repositoryFactory = new DbContextFactory();

            return repositoryFactory.CreateDbContext(connectionString);
        }
    }
}
