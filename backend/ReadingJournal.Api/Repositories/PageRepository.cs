using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Repositories;

public class PageRepository(InMemoryJournalStore store) : IPageRepository
{
    public Task<IReadOnlyCollection<Page>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            return Task.FromResult<IReadOnlyCollection<Page>>(
                store.Pages
                    .OrderByDescending(page => page.CreatedAt)
                    .Select(ClonePage)
                    .ToList());
        }
    }

    public Task<Page?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var page = store.Pages.FirstOrDefault(page => page.Id == id);
            return Task.FromResult(page is null ? null : ClonePage(page));
        }
    }

    public Task<Page> AddAsync(Page page, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            store.Pages.Add(page);
            return Task.FromResult(ClonePage(page));
        }
    }

    public Task UpdateAsync(Page page, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var index = store.Pages.FindIndex(item => item.Id == page.Id);
            if (index >= 0)
            {
                var current = store.Pages[index];
                page.Quotes = current.Quotes;
                page.Images = current.Images;
                store.Pages[index] = page;
            }
        }

        return Task.CompletedTask;
    }

    public Task DeleteAsync(Page page, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            store.Pages.RemoveAll(item => item.Id == page.Id);
        }

        return Task.CompletedTask;
    }

    public Task<PageImage> AddImageAsync(PageImage image, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var page = store.Pages.FirstOrDefault(item => item.Id == image.PageId);
            page?.Images.Add(image);
            return Task.FromResult(image);
        }
    }

    public Task<IReadOnlyCollection<PageImage>> GetImagesAsync(Guid pageId, CancellationToken cancellationToken = default)
    {
        lock (store.Lock)
        {
            var images = store.Pages
                .FirstOrDefault(page => page.Id == pageId)?
                .Images
                .OrderByDescending(image => image.CreatedAt)
                .ToList() ?? [];

            return Task.FromResult<IReadOnlyCollection<PageImage>>(images);
        }
    }

    private static Page ClonePage(Page page)
    {
        return new Page
        {
            Id = page.Id,
            Title = page.Title,
            Author = page.Author,
            Genre = page.Genre,
            Publisher = page.Publisher,
            Year = page.Year,
            Isbn = page.Isbn,
            PageCount = page.PageCount,
            StartedAt = page.StartedAt,
            FinishedAt = page.FinishedAt,
            Status = page.Status,
            Rating = page.Rating,
            Characters = page.Characters,
            Summary = page.Summary,
            PersonalReview = page.PersonalReview,
            CreatedAt = page.CreatedAt,
            UpdatedAt = page.UpdatedAt,
            Quotes = page.Quotes.OrderBy(quote => quote.CreatedAt).ToList(),
            Images = page.Images.OrderBy(image => image.CreatedAt).ToList()
        };
    }
}
