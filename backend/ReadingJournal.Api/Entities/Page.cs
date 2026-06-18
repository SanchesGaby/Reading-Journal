using System.ComponentModel.DataAnnotations;

namespace ReadingJournal.Api.Entities;

public class Page
{
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    public string? Genre { get; set; }
    public string? Publisher { get; set; }
    public int? Year { get; set; }
    public string? Isbn { get; set; }
    public int? PageCount { get; set; }
    public DateOnly? StartedAt { get; set; }
    public DateOnly? FinishedAt { get; set; }
    public ReadingStatus Status { get; set; } = ReadingStatus.Wishlist;
    public decimal Rating { get; set; }
    public string? Characters { get; set; }
    public string? Summary { get; set; }
    public string? PersonalReview { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Quote> Quotes { get; set; } = new List<Quote>();
    public ICollection<PageImage> Images { get; set; } = new List<PageImage>();
}
