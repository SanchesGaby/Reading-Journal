using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Repositories;

public class InMemoryJournalStore
{
    public List<Page> Pages { get; } = [];
    public object Lock { get; } = new();
}
