using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DataAccess
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAll(int categoryId = 0);

        Task<Stock> GetById(int id);

        Task<Stock> Create(Stock stock);

        Task Update(int id, Stock stock);

        Task<Stock> Delete(int id);
    }
}
