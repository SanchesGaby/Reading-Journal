using System.ComponentModel.DataAnnotations;

namespace ReadingJournal.Api.Entities;

public class Quote
{
    public Guid Id { get; set; }
    public Guid PageId { get; set; }

    [Required]
    public string Text { get; set; } = string.Empty;

    public string? Note { get; set; }
    public int? PageNumber { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Page? Page { get; set; }
}
