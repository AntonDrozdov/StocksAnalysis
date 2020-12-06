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
    public class CommentRepository: BaseRepository, ICommentRepository
    {
        public CommentRepository(string connectionString, IDbContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<List<Comment>> GetAll(int stockId = 0)
        {
            List<Comment> result;

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var query = context.Comments.AsQueryable();

                if (stockId != 0)
                    query = query.Where(c => c.StockId == stockId);
                
                result = await query
                    .Include(s => s.Stock)
                    .ToListAsync();
            }

            return result;
        }

        public async Task<Comment> GetById(int id)
        {
            Comment result = null;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                result = await context.Comments.FindAsync(id);
            }

            return result;
        }

        public async Task<Comment> Create(Comment comment)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                try
                {
                    context.Comments.Add(comment);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return null;
                }

            }

            return comment;
        }

        public async Task Update(int id, Comment comment)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {

                var commentEntity = context.Comments.FirstOrDefault(comment => comment.Id == id);

                if (commentEntity == null)
                    return;

                //update props

                commentEntity.Content = comment.Content;
                commentEntity.Rating = comment.Rating;
                commentEntity.Date = DateTime.Today;
                
                context.Entry(commentEntity).State = EntityState.Modified;
                
                try
                {
                    await context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (!CommentExists(id))
                    {
                       throw;
                    }

                    throw;
                }
            }
        }

        public async Task<Comment> Delete(int id)
        {
            Comment comment;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                comment = await context.Comments.FindAsync(id);
                if (comment == null)
                {
                    return null;
                }

                context.Comments.Remove(comment);
                await context.SaveChangesAsync();
            }

            return comment;
        }

        private bool CommentExists(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return context.Comments.Any(e => e.Id == id);
            }
        }
    }
}
