using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccess.Infrastructure;
using Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        IStockRepository _stockRepository;

        public StocksController(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }
        // GET: api/Stocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks(int categoryId)
        {
            return await _stockRepository.GetAll(categoryId);
        }

        // GET: api/Stocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stock>> GetStock(int id)
        {
            var result = await _stockRepository.GetById(id);

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
        public async Task<IActionResult> PutStock(int id, Stock stock)
        {
            if (id != stock.Id)
            {
                return BadRequest();
            }

            await _stockRepository.Update(id, stock);

            return NoContent();
        }

        // POST: api/Stocks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Stock>> PostStock(Stock stock)
        {
            var result = await _stockRepository.Create(stock);

            if (result == null)
            {
                return BadRequest();
            }

            return CreatedAtAction("GetStock", new { id = stock.Id }, stock);
        }

        // DELETE: api/Stocks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Stock>> DeleteStock(int id)
        {
            var result = await _stockRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }


    }
}
