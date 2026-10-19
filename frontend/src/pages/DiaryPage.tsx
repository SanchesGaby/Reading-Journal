
import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import { useState } from 'react';
import type { ReadingStatus } from '../types/page';
import { Link as RouterLink } from 'react-router-dom';
import { usePages } from '../hooks/usePages';
import { statusLabel, statusOptions } from '../utils/status';

export function DiaryPage() {
  const { pages, loading, error } = usePages();

  const [selectedStatus, setSelectedStatus] =
    useState<ReadingStatus | 'All'>('All');

  const filteredPages =
    selectedStatus === 'All'
      ? pages
      : pages.filter((page) => page.status === selectedStatus);

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography
            variant="h3"
            fontFamily="Georgia, serif"
            fontWeight={800}
          >
            Meu Livro
          </Typography>

          <Typography color="text.secondary">
            Folheie suas leituras como um caderno guardado na estante.
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/paginas/nova"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nova pagina
        </Button>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <FormControl sx={{ minWidth: 220, maxWidth: 320 }}>
        <InputLabel id="status-filter-label">
          Filtrar por status
        </InputLabel>

        <Select
          labelId="status-filter-label"
          value={selectedStatus}
          label="Filtrar por status"
          onChange={(event) =>
            setSelectedStatus(
              event.target.value as ReadingStatus | 'All',
            )
          }
        >
          <MenuItem value="All">Todos os livros</MenuItem>

          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <CircularProgress />}

      {!loading && filteredPages.length === 0 && (
        <Paper
          variant="outlined"
          sx={{ p: 4, borderStyle: 'dashed' }}
        >
          <Typography color="text.secondary">
            {pages.length === 0
              ? 'Adicione o primeiro livro para comecar a folhear.'
              : 'Nenhum livro encontrado para este status.'}
          </Typography>
        </Paper>
      )}

      {!loading && filteredPages.length > 0 && (
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
              <Typography variant="h2">
                Reading Journal
              </Typography>

              <Typography>Meu livro de resenhas</Typography>
            </article>

            {filteredPages.map((page) => (
              <article className="book-page" key={page.id}>
                <Box
                  className="book-cover-strip"
                  sx={{
                    backgroundImage: page.coverImageUrl
                      ? `url(${page.coverImageUrl})`
                      : undefined,
                  }}
                />

                <Typography
                  variant="h4"
                  fontFamily="Georgia, serif"
                  fontWeight={800}
                >
                  {page.title}
                </Typography>

                <Typography color="text.secondary" mb={1}>
                  {page.author}
                </Typography>

                <Rating
                  value={Number(page.rating)}
                  precision={0.5}
                  readOnly
                />

                <Typography
                  mt={2}
                  variant="body2"
                  color="text.secondary"
                >
                  {statusLabel[page.status]}{' '}
                  {page.genre ? `- ${page.genre}` : ''}
                </Typography>

                <Button
                  component={RouterLink}
                  to={`/paginas/${page.id}`}
                  sx={{ mt: 'auto' }}
                >
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
