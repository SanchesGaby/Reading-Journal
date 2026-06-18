import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, CircularProgress, Paper, Rating, Stack, Typography } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import { Link as RouterLink } from 'react-router-dom';
import { usePages } from '../hooks/usePages';
import { statusLabel } from '../utils/status';

export function DiaryPage() {
  const { pages, loading, error } = usePages();

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h3" fontFamily="Georgia, serif" fontWeight={800}>
            Meu Livro
          </Typography>
          <Typography color="text.secondary">Folheie suas leituras como um caderno guardado na estante.</Typography>
        </Box>
        <Button component={RouterLink} to="/paginas/nova" variant="contained" startIcon={<AddIcon />}>
          Nova pagina
        </Button>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}

      {!loading && pages.length === 0 && (
        <Paper variant="outlined" sx={{ p: 4, borderStyle: 'dashed' }}>
          <Typography color="text.secondary">Adicione o primeiro livro para comecar a folhear.</Typography>
        </Paper>
      )}

      {pages.length > 0 && (
        <Box sx={{ overflowX: 'auto', pb: 2 }}>
          <HTMLFlipBook
            width={390}
            height={560}
            size="stretch"
            minWidth={300}
            maxWidth={430}
            minHeight={450}
            maxHeight={620}
            showCover
            mobileScrollSupport
            className="page-flip-book"
            style={{}}
            startPage={0}
            drawShadow
            flippingTime={900}
            usePortrait
            startZIndex={0}
            autoSize
            maxShadowOpacity={0.35}
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
          >
            <article className="book-page cover-page">
              <Typography variant="h2">Reading Journal</Typography>
              <Typography>Meu livro de resenhas</Typography>
            </article>
            {pages.map((page) => (
              <article className="book-page" key={page.id}>
                <Box
                  className="book-cover-strip"
                  sx={{ backgroundImage: page.coverImageUrl ? `url(${page.coverImageUrl})` : undefined }}
                />
                <Typography variant="h4" fontFamily="Georgia, serif" fontWeight={800}>
                  {page.title}
                </Typography>
                <Typography color="text.secondary" mb={1}>
                  {page.author}
                </Typography>
                <Rating value={Number(page.rating)} precision={0.5} readOnly />
                <Typography mt={2} variant="body2" color="text.secondary">
                  {statusLabel[page.status]} {page.genre ? `- ${page.genre}` : ''}
                </Typography>
                <Button component={RouterLink} to={`/paginas/${page.id}`} sx={{ mt: 'auto' }}>
                  Abrir resenha
                </Button>
              </article>
            ))}
          </HTMLFlipBook>
        </Box>
      )}
    </Stack>
  );
}
