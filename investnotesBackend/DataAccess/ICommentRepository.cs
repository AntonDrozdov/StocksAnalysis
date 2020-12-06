using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DataAccess
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAll(int stockId = 0);

        Task<Comment> GetById(int id);

        Task<Comment> Create(Comment comment);

        Task Update(int id, Comment comment);

        Task<Comment> Delete(int id);
    }
}
