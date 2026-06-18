using AutoMapper;
using ReadingJournal.Api.DTOs;
using ReadingJournal.Api.Entities;
using ReadingJournal.Api.Exceptions;
using ReadingJournal.Api.Repositories;

namespace ReadingJournal.Api.Services;

public class PageService(IPageRepository repository, IFileStorageService fileStorage, IMapper mapper) : IPageService
{
    public async Task<IReadOnlyCollection<PageListDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var pages = await repository.GetAllAsync(cancellationToken);
        return mapper.Map<IReadOnlyCollection<PageListDto>>(pages);
    }

    public async Task<PageDetailsDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var page = await GetPageOrThrowAsync(id, cancellationToken);
        return mapper.Map<PageDetailsDto>(page);
    }

    public async Task<PageDetailsDto> CreateAsync(UpsertPageDto dto, CancellationToken cancellationToken = default)
    {
        ValidateDates(dto);
        var page = mapper.Map<Page>(dto);
        page.Id = Guid.NewGuid();
        page.CreatedAt = DateTime.UtcNow;
        page.UpdatedAt = DateTime.UtcNow;

        await repository.AddAsync(page, cancellationToken);
        return mapper.Map<PageDetailsDto>(page);
    }

    public async Task<PageDetailsDto> UpdateAsync(Guid id, UpsertPageDto dto, CancellationToken cancellationToken = default)
    {
        ValidateDates(dto);
        var page = await GetPageOrThrowAsync(id, cancellationToken);
        mapper.Map(dto, page);
        page.UpdatedAt = DateTime.UtcNow;

        await repository.UpdateAsync(page, cancellationToken);
        return mapper.Map<PageDetailsDto>(page);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var page = await GetPageOrThrowAsync(id, cancellationToken);
        await repository.DeleteAsync(page, cancellationToken);
    }

    public async Task<PageImageDto> UploadImageAsync(Guid pageId, IFormFile file, HttpRequest request, CancellationToken cancellationToken = default)
    {
        await GetPageOrThrowAsync(pageId, cancellationToken);
        var image = await fileStorage.SavePageImageAsync(pageId, file, request, cancellationToken);
        var saved = await repository.AddImageAsync(image, cancellationToken);
        return mapper.Map<PageImageDto>(saved);
    }

    public async Task<PageImageDto> AddImageUrlAsync(Guid pageId, CreatePageImageUrlDto dto, CancellationToken cancellationToken = default)
    {
        await GetPageOrThrowAsync(pageId, cancellationToken);

        if (!Uri.TryCreate(dto.Url, UriKind.Absolute, out var uri) ||
            (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
        {
            throw new ArgumentException("Informe uma URL de imagem valida.");
        }

        var image = new PageImage
        {
            Id = Guid.NewGuid(),
            PageId = pageId,
            FileName = uri.Segments.LastOrDefault()?.Trim('/') ?? "imagem-remota",
            OriginalFileName = string.IsNullOrWhiteSpace(dto.Description) ? "Imagem da internet" : dto.Description,
            ContentType = "image/remote",
            Url = dto.Url,
            CreatedAt = DateTime.UtcNow
        };

        var saved = await repository.AddImageAsync(image, cancellationToken);
        return mapper.Map<PageImageDto>(saved);
    }

    public async Task<IReadOnlyCollection<PageImageDto>> GetImagesAsync(Guid pageId, CancellationToken cancellationToken = default)
    {
        await GetPageOrThrowAsync(pageId, cancellationToken);
        var images = await repository.GetImagesAsync(pageId, cancellationToken);
        return mapper.Map<IReadOnlyCollection<PageImageDto>>(images);
    }

    private async Task<Page> GetPageOrThrowAsync(Guid id, CancellationToken cancellationToken)
    {
        return await repository.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException("Pagina nao encontrada.");
    }

    private static void ValidateDates(UpsertPageDto dto)
    {
        if (dto.StartedAt.HasValue && dto.FinishedAt.HasValue && dto.FinishedAt < dto.StartedAt)
        {
            throw new ArgumentException("A data de conclusao nao pode ser anterior ao inicio.");
        }
    }
}
