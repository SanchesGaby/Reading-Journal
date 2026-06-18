using ReadingJournal.Api.DTOs;
using ReadingJournal.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ReadingJournal.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController(IQuoteService quoteService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<QuoteDto>> Create([FromBody] CreateQuoteDto dto, CancellationToken cancellationToken)
    {
        var quote = await quoteService.CreateAsync(dto, cancellationToken);
        return Created($"/api/quotes/{quote.Id}", quote);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await quoteService.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
