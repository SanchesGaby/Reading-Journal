using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Repositories;

public interface IQuoteRepository
{
    Task<Quote> AddAsync(Quote quote, CancellationToken cancellationToken = default);
    Task<Quote?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task DeleteAsync(Quote quote, CancellationToken cancellationToken = default);
}
