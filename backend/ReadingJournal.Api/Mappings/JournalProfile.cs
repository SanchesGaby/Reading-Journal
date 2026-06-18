using AutoMapper;
using ReadingJournal.Api.DTOs;
using ReadingJournal.Api.Entities;

namespace ReadingJournal.Api.Mappings;

public class JournalProfile : Profile
{
    public JournalProfile()
    {
        CreateMap<Page, PageListDto>()
            .ForCtorParam("CoverImageUrl", options => options.MapFrom(page =>
                page.Images.OrderBy(image => image.CreatedAt).Select(image => image.Url).FirstOrDefault()));
        CreateMap<Page, PageDetailsDto>();
        CreateMap<Quote, QuoteDto>();
        CreateMap<PageImage, PageImageDto>();
        CreateMap<UpsertPageDto, Page>();
        CreateMap<CreateQuoteDto, Quote>();
    }
}
