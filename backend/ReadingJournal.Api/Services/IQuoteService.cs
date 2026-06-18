using ReadingJournal.Api.DTOs;

namespace ReadingJournal.Api.Services;

public interface IQuoteService
{
    Task<QuoteDto> CreateAsync(CreateQuoteDto dto, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
