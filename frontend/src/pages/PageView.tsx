
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  addPageImageUrl,
  createQuote,
  deletePage,
  deleteQuote,
  getPage,
  uploadPageImage,
} from '../services/pagesApi';
import type { PageDetails } from '../types/page';
import { statusLabel } from '../utils/status';

export function PageView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<PageDetails | null>(null);
  const [quoteText, setQuoteText] = useState('');
  const [quotePage, setQuotePage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!id) return;

    try {
      setPage(await getPage(id));
    } catch {
      setError('Nao foi possivel abrir esta pagina.');
    }
  }

  useEffect(() => {
    void load();
  }, [id]);

  async function handleUpload(file?: File) {
    if (!id || !file) return;

    await uploadPageImage(id, file);
    await load();
  }

  async function handleImageUrl(event: FormEvent) {
    event.preventDefault();

    if (!id || !imageUrl.trim()) return;

    await addPageImageUrl(id, { url: imageUrl.trim() });
    setImageUrl('');
    await load();
  }

  async function handleQuote(event: FormEvent) {
    event.preventDefault();

    if (!id || !quoteText.trim()) return;

    await createQuote({
      pageId: id,
      text: quoteText,
      pageNumber: quotePage ? Number(quotePage) : null,
    });

    setQuoteText('');
    setQuotePage('');
    await load();
  }

  async function handleDeletePage() {
    if (!id || !confirm('Excluir esta pagina do diario?')) return;

    await deletePage(id);
    navigate('/');
  }

  async function handleDeleteQuote(quoteId: string) {
    await deleteQuote(quoteId);
    await load();
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!page) return <CircularProgress />;

  const textBlockSx = {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 1120, mx: 'auto' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Stack direction="row" spacing={1} mb={1}>
            <Chip
              label={statusLabel[page.status]}
              color="secondary"
              variant="outlined"
            />
            {page.genre && (
              <Chip label={page.genre} variant="outlined" />
            )}
          </Stack>

          <Typography
            variant="h3"
            fontFamily="Georgia, serif"
            fontWeight={800}
          >
            {page.title}
          </Typography>

          <Typography variant="h6" color="text.secondary">
            {page.author}
          </Typography>

          <Rating
            value={Number(page.rating)}
            precision={0.5}
            readOnly
            sx={{ mt: 1 }}
          />
        </Box>

        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Button
            component={RouterLink}
            to={`/paginas/${page.id}/editar`}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            Editar
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeletePage}
          >
            Excluir
          </Button>
        </Stack>
      </Stack>

      <Grid container alignItems="space-between" spacing={0.5}>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Stack spacing={1}>
              <Typography fontWeight={800}>Ficha do livro</Typography>
              <Typography sx={textBlockSx}>
                Editora: {page.publisher || '-'}
              </Typography>
              <Typography>Ano: {page.year || '-'}</Typography>
              <Typography sx={textBlockSx}>
                ISBN: {page.isbn || '-'}
              </Typography>
              <Typography>Paginas: {page.pageCount || '-'}</Typography>
              <Typography>Inicio: {page.startedAt || '-'}</Typography>
              <Typography>Conclusao: {page.finishedAt || '-'}</Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            variant="outlined"
            sx={{ p: 3, height: '100%', minWidth: 0 }}
          >
            <Stack spacing={2}>
              <section>
                <Typography
                  variant="h5"
                  fontFamily="Georgia, serif"
                  fontWeight={800}
                >
                  Resumo
                </Typography>
                <Typography sx={textBlockSx}>
                  {page.summary || 'Sem resumo ainda.'}
                </Typography>
              </section>

              <section>
                <Typography
                  variant="h5"
                  fontFamily="Georgia, serif"
                  fontWeight={800}
                >
                  Resenha pessoal
                </Typography>
                <Typography sx={textBlockSx}>
                  {page.personalReview || 'Sem resenha ainda.'}
                </Typography>
              </section>

              <section>
                <Typography
                  variant="h5"
                  fontFamily="Georgia, serif"
                  fontWeight={800}
                >
                  Personagens
                </Typography>
                <Typography sx={textBlockSx}>
                  {page.characters || '-'}
                </Typography>
              </section>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              variant="h5"
              fontFamily="Georgia, serif"
              fontWeight={800}
            >
              Imagens
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Enviar arquivo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    void handleUpload(event.target.files?.[0])
                  }
                />
              </Button>
            </Stack>
          </Stack>

          <Stack
            component="form"
            direction={{ xs: 'column', md: 'row' }}
            spacing={1.5}
            onSubmit={handleImageUrl}
          >
            <TextField
              fullWidth
              label="Link de imagem da internet"
              placeholder="https://exemplo.com/capa.jpg"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />

            <Button
              type="submit"
              variant="outlined"
              startIcon={<AddLinkIcon />}
              sx={{ minWidth: 170 }}
            >
              Adicionar link
            </Button>
          </Stack>

          <Grid container spacing={1.5}>
            {page.images.map((image) => (
              <Grid item xs={6} md={3} key={image.id}>
                <Box
                  component="img"
                  src={image.url}
                  alt={image.originalFileName}
                  sx={{
                    width: '100%',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    borderRadius: 1,
                    display: 'block',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography
            variant="h5"
            fontFamily="Georgia, serif"
            fontWeight={800}
          >
            Citações favoritas
          </Typography>

          <Stack
            component="form"
            direction={{ xs: 'column', md: 'row' }}
            spacing={1.5}
            onSubmit={handleQuote}
          >
            <TextField
              fullWidth
              label="Nova citacao"
              value={quoteText}
              onChange={(event) => setQuoteText(event.target.value)}
            />

            <TextField
              label="Pagina"
              type="number"
              value={quotePage}
              onChange={(event) => setQuotePage(event.target.value)}
              sx={{ width: { md: 120 } }}
            />

            <Button
              type="submit"
              variant="contained"
              startIcon={<FormatQuoteIcon />}
            >
              Adicionar
            </Button>
          </Stack>

          {page.quotes.map((quote) => (
            <Paper
              key={quote.id}
              variant="outlined"
              sx={{ p: 2, bgcolor: '#fffdf8' }}
            >
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
              >
                <Typography sx={textBlockSx}>
                  "{quote.text}"{' '}
                  {quote.pageNumber ? `(p. ${quote.pageNumber})` : ''}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => void handleDeleteQuote(quote.id)}
                  aria-label="Excluir citacao"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
