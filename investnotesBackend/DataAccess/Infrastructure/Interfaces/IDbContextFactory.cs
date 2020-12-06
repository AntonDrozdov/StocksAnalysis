namespace DataAccess.Infrastructure.Interfaces
{
    public interface IDbContextFactory
    {
        ApplicationDbContext CreateDbContext(string connectionString);
    }
}
