using ReadingJournal.Api.DTOs;

namespace ReadingJournal.Api.Services;

public interface IPageService
{
    Task<IReadOnlyCollection<PageListDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<PageDetailsDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<PageDetailsDto> CreateAsync(UpsertPageDto dto, CancellationToken cancellationToken = default);
    Task<PageDetailsDto> UpdateAsync(Guid id, UpsertPageDto dto, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<PageImageDto> UploadImageAsync(Guid pageId, IFormFile file, HttpRequest request, CancellationToken cancellationToken = default);
    Task<PageImageDto> AddImageUrlAsync(Guid pageId, CreatePageImageUrlDto dto, CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<PageImageDto>> GetImagesAsync(Guid pageId, CancellationToken cancellationToken = default);
}
