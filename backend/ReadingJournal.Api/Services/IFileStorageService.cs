using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Services;

public interface IFileStorageService
{
    Task<PageImage> SavePageImageAsync(Guid pageId, IFormFile file, HttpRequest request, CancellationToken cancellationToken = default);
}
