using ReadingJournal.Api.DTOs;
using ReadingJournal.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ReadingJournal.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController(IPageService pageService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<PageListDto>>> GetAll(CancellationToken cancellationToken)
    {
        var pages = await pageService.GetAllAsync(cancellationToken);
        return Ok(pages);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PageDetailsDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var page = await pageService.GetByIdAsync(id, cancellationToken);
        return Ok(page);
    }

    [HttpPost]
    public async Task<ActionResult<PageDetailsDto>> Create([FromBody] UpsertPageDto dto, CancellationToken cancellationToken)
    {
        var page = await pageService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = page.Id }, page);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<PageDetailsDto>> Update(Guid id, [FromBody] UpsertPageDto dto, CancellationToken cancellationToken)
    {
        var page = await pageService.UpdateAsync(id, dto, cancellationToken);
        return Ok(page);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await pageService.DeleteAsync(id, cancellationToken);
        return NoContent();
    }

    [HttpPost("{id:guid}/upload")]
    [RequestSizeLimit(8_388_608)]
    public async Task<ActionResult<PageImageDto>> Upload(Guid id, IFormFile file, CancellationToken cancellationToken)
    {
        var image = await pageService.UploadImageAsync(id, file, Request, cancellationToken);
        return Ok(image);
    }

    [HttpPost("{id:guid}/images")]
    public async Task<ActionResult<PageImageDto>> AddImageUrl(Guid id, [FromBody] CreatePageImageUrlDto dto, CancellationToken cancellationToken)
    {
        var image = await pageService.AddImageUrlAsync(id, dto, cancellationToken);
        return Ok(image);
    }

    [HttpGet("{id:guid}/images")]
    public async Task<ActionResult<IReadOnlyCollection<PageImageDto>>> GetImages(Guid id, CancellationToken cancellationToken)
    {
        var images = await pageService.GetImagesAsync(id, cancellationToken);
        return Ok(images);
    }
}
