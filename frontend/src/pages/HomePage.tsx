import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookIcon from '@mui/icons-material/Book';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Alert, Box, Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { usePages } from '../hooks/usePages';

export function HomePage() {
  const { pages, loading, error } = usePages();
  const recent = pages.slice(0, 6);

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          minHeight: { xs: 420, md: 460 },
          display: 'grid',
          alignItems: 'center',
          borderBottom: '1px solid rgba(84, 70, 56, 0.16)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack spacing={3} maxWidth={720}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AutoStoriesIcon color="secondary" />
            <Typography variant="overline" color="text.secondary" fontWeight={800}>
              Diario pessoal de leituras
            </Typography>
          </Stack>
          <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 72 }, lineHeight: 0.95 }}>
            Reading Journal
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={620}>
            Guarde livros, resenhas, personagens, imagens e citações favoritas em paginas com cara de scrapbook.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button component={RouterLink} to="/paginas/nova" variant="contained" size="large" startIcon={<NoteAddIcon />}>
              Criar nova pagina
            </Button>
            <Button component={RouterLink} to="/diario" variant="outlined" size="large" startIcon={<BookIcon />}>
              Acessar diario
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={2}>
        <Typography variant="h4" fontFamily="Georgia, serif" fontWeight={800}>
          Ultimos livros adicionados
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {loading && <CircularProgress />}
        {!loading && recent.length === 0 && (
          <Paper variant="outlined" sx={{ p: 4, borderStyle: 'dashed' }}>
            <Typography color="text.secondary">Seu diario ainda esta em branco.</Typography>
          </Paper>
        )}
        <Grid container spacing={2.5}>
          {recent.map((page) => (
            <Grid item xs={12} sm={6} md={4} key={page.id}>
              <BookCard page={page} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
