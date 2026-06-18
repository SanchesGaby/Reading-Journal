using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Repositories;

public class QuoteRepository(InMemoryJournalStore store) : IQuoteRepository
{
    public Task<Quote> AddAsync(Quote quote, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var page = store.Pages.FirstOrDefault(item => item.Id == quote.PageId);
            page?.Quotes.Add(quote);
            return Task.FromResult(quote);
        }
    }

    public Task<Quote?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var quote = store.Pages.SelectMany(page => page.Quotes).FirstOrDefault(quote => quote.Id == id);
            return Task.FromResult(quote);
        }
    }

    public Task DeleteAsync(Quote quote, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var page = store.Pages.FirstOrDefault(item => item.Id == quote.PageId);
            page?.Quotes.Remove(quote);
        }

        return Task.CompletedTask;
    }
}
