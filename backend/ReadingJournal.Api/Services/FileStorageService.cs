using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Services;

public class FileStorageService(IWebHostEnvironment environment) : IFileStorageService
{
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif"
    };

    public async Task<PageImage> SavePageImageAsync(Guid pageId, IFormFile file, HttpRequest request, CancellationToken cancellationToken = default)
    {
        if (file.Length == 0)
        {
            throw new ArgumentException("Imagem vazia.");
        }

        if (!AllowedContentTypes.Contains(file.ContentType))
        {
            throw new ArgumentException("Formato de imagem inválido. Use JPG, PNG, WEBP ou GIF.");
        }

        var uploadsPath = Path.Combine(environment.ContentRootPath, "uploads");
        Directory.CreateDirectory(uploadsPath);

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid():N}{extension}";
        var path = Path.Combine(uploadsPath, fileName);

        await using var stream = File.Create(path);
        await file.CopyToAsync(stream, cancellationToken);

        var publicUrl = $"{request.Scheme}://{request.Host}/uploads/{fileName}";
        return new PageImage
        {
            PageId = pageId,
            FileName = fileName,
            OriginalFileName = file.FileName,
            ContentType = file.ContentType,
            Url = publicUrl
        };
    }
}
