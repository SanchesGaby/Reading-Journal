using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Repositories;

public interface IPageRepository
{
    Task<IReadOnlyCollection<Page>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Page?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Page> AddAsync(Page page, CancellationToken cancellationToken = default);
    Task UpdateAsync(Page page, CancellationToken cancellationToken = default);
    Task DeleteAsync(Page page, CancellationToken cancellationToken = default);
    Task<PageImage> AddImageAsync(PageImage image, CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<PageImage>> GetImagesAsync(Guid pageId, CancellationToken cancellationToken = default);
}
