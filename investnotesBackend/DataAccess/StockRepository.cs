using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DataAccess
{
    public class StockRepository: BaseRepository, IStockRepository
    {
        public StockRepository(string connectionString, IDbContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<List<Stock>> GetAll(int categoryId = 0)
        {
            List<Stock> result;

             using (var context = ContextFactory.CreateDbContext(ConnectionString))
             {
                 var query = context.Stocks.AsQueryable();
                 if (categoryId != 0)
                 {
                     query = query.Where(s => s.IndustryId  == categoryId);
                 }
                 
                 //query = query.Include(s => s.Comments)
                 //    .Include(s => s.DividendComments)
                 //    .Include(s => s.Tags);

                 result = await query
                     .Include(s=>s.Industry)
                     .ToListAsync(); 
             }

             return result;
        }

        public async Task<Stock> GetById(int id)
        {
            Stock result = null;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                result = await context.Stocks.FindAsync(id);
            }

            return result;
        }

        public async Task<Stock> Create(Stock stock)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                try
                {
                    var industry = context.Industries.FirstOrDefault(c=>c.Title == stock.Industry.Title);

                    if (industry != null)
                        stock.Industry = industry;

                    context.Stocks.Add(stock);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return null;
                }

            }

            return stock;
        }

        public async Task Update(int id, Stock stock)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {

                var stockEntity = context.Stocks.FirstOrDefault(stock => stock.Id == id);

                if (stockEntity == null)
                    return;

                //update props
                if (stock.Industry.Title != null)
                {
                    var industry = context.Industries.FirstOrDefault(c => c.Title == stock.Industry.Title);

                    if (industry != null)
                        stockEntity.Industry = industry;
                }
                else
                {
                    var industry = context.Industries.FirstOrDefault(c => c.Title == stockEntity.Industry.Title);

                    if (industry != null)
                        stockEntity.Industry = industry;
                }
                stockEntity.Title = stock.Title;
                stockEntity.Ticker= stock.Ticker;
                
                context.Entry(stockEntity).State = EntityState.Modified;
                
                try
                {
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (!StockExists(id))
                    {
                       throw;
                    }

                    throw;
                }
            }
        }

        public async Task<Stock> Delete(int id)
        {
            Stock stock;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                stock = await context.Stocks.FindAsync(id);
                if (stock == null)
                {
                    return null;
                }

                context.Stocks.Remove(stock);
                await context.SaveChangesAsync();
            }

            return stock;
        }

        private bool StockExists(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return context.Stocks.Any(e => e.Id == id);
            }
        }
    }
}
