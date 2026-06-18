using System.ComponentModel.DataAnnotations;
using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.DTOs;

public record QuoteDto(Guid Id, Guid PageId, string Text, string? Note, int? PageNumber, DateTime CreatedAt);

public record PageImageDto(Guid Id, Guid PageId, string FileName, string OriginalFileName, string ContentType, string Url, DateTime CreatedAt);

public record PageListDto(
    Guid Id,
    string Title,
    string Author,
    string? Genre,
    ReadingStatus Status,
    decimal Rating,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    string? CoverImageUrl);

public record PageDetailsDto(
    Guid Id,
    string Title,
    string Author,
    string? Genre,
    string? Publisher,
    int? Year,
    string? Isbn,
    int? PageCount,
    DateOnly? StartedAt,
    DateOnly? FinishedAt,
    ReadingStatus Status,
    decimal Rating,
    string? Characters,
    string? Summary,
    string? PersonalReview,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    IReadOnlyCollection<QuoteDto> Quotes,
    IReadOnlyCollection<PageImageDto> Images);

public class UpsertPageDto
{
    [Required, MaxLength(180)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(140)]
    public string Author { get; set; } = string.Empty;

    [MaxLength(80)]
    public string? Genre { get; set; }

    [MaxLength(120)]
    public string? Publisher { get; set; }

    [Range(0, 3000)]
    public int? Year { get; set; }

    [MaxLength(20)]
    public string? Isbn { get; set; }

    [Range(0, 10000)]
    public int? PageCount { get; set; }

    public DateOnly? StartedAt { get; set; }
    public DateOnly? FinishedAt { get; set; }
    public ReadingStatus Status { get; set; } = ReadingStatus.Wishlist;

    [Range(0, 5)]
    public decimal Rating { get; set; }

    public string? Characters { get; set; }
    public string? Summary { get; set; }
    public string? PersonalReview { get; set; }
}

public class CreateQuoteDto
{
    [Required]
    public Guid PageId { get; set; }

    [Required, MaxLength(1200)]
    public string Text { get; set; } = string.Empty;

    [MaxLength(240)]
    public string? Note { get; set; }

    [Range(0, 10000)]
    public int? PageNumber { get; set; }
}

public class CreatePageImageUrlDto
{
    [Required, Url, MaxLength(500)]
    public string Url { get; set; } = string.Empty;

    [MaxLength(260)]
    public string? Description { get; set; }
}
