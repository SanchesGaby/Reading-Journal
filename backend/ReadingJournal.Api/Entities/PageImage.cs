using System.ComponentModel.DataAnnotations;

namespace ReadingJournal.Api.Entities;

public class PageImage
{
    public Guid Id { get; set; }
    public Guid PageId { get; set; }

    [Required]
    public string FileName { get; set; } = string.Empty;

    [Required]
    public string OriginalFileName { get; set; } = string.Empty;

    [Required]
    public string ContentType { get; set; } = string.Empty;

    [Required]
    public string Url { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Page? Page { get; set; }
}
