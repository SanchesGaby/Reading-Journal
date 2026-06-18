using AutoMapper;
using ReadingJournal.Api.DTOs;
using ReadingJournal.Api.Entities;
using ReadingJournal.Api.Exceptions;
using ReadingJournal.Api.Repositories;

namespace ReadingJournal.Api.Services;

public class QuoteService(IQuoteRepository quoteRepository, IPageRepository pageRepository, IMapper mapper) : IQuoteService
{
    public async Task<QuoteDto> CreateAsync(CreateQuoteDto dto, CancellationToken cancellationToken = default)
    {
        _ = await pageRepository.GetByIdAsync(dto.PageId, cancellationToken)
            ?? throw new NotFoundException("Pagina nao encontrada para a citacao.");

        var quote = mapper.Map<Quote>(dto);
        quote.Id = Guid.NewGuid();
        quote.CreatedAt = DateTime.UtcNow;

        var saved = await quoteRepository.AddAsync(quote, cancellationToken);
        return mapper.Map<QuoteDto>(saved);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var quote = await quoteRepository.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException("Citacao nao encontrada.");

        await quoteRepository.DeleteAsync(quote, cancellationToken);
    }
}
