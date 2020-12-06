using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        ICommentRepository _commentRepository;

        public CommentsController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        // GET: api/Stocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int stockId)
        {
            return await _commentRepository.GetAll(stockId);
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var result = await _commentRepository.GetById(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        // PUT: api/Stocks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            await _commentRepository.Update(id, comment);

            return NoContent();
        }

        // POST: api/Stocks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Comment>> PostStock(Comment comment)
        {
            var result = await _commentRepository.Create(comment);

            if (result == null)
            {
                return BadRequest();
            }

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Stocks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment(int id)
        {
            var result = await _commentRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }


    }
}
