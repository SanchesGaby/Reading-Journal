import SaveIcon from '@mui/icons-material/Save';
import { Alert, Box, Button, Grid, MenuItem, Paper, Rating, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApiErrorMessage } from '../services/api';
import { createPage, getPage, updatePage } from '../services/pagesApi';
import type { PageDetails, PagePayload, ReadingStatus } from '../types/page';
import { statusOptions } from '../utils/status';

const emptyForm: PagePayload = {
  title: '',
  author: '',
  genre: '',
  publisher: '',
  year: null,
  isbn: '',
  pageCount: null,
  startedAt: null,
  finishedAt: null,
  status: 'Wishlist',
  rating: 0,
  characters: '',
  summary: '',
  personalReview: '',
};

function toPagePayload(page: PageDetails): PagePayload {
  return {
    title: page.title,
    author: page.author,
    genre: page.genre ?? '',
    publisher: page.publisher ?? '',
    year: page.year ?? null,
    isbn: page.isbn ?? '',
    pageCount: page.pageCount ?? null,
    startedAt: page.startedAt ?? null,
    finishedAt: page.finishedAt ?? null,
    status: page.status,
    rating: Number(page.rating),
    characters: page.characters ?? '',
    summary: page.summary ?? '',
    personalReview: page.personalReview ?? '',
  };
}

export function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<PagePayload>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    getPage(id)
      .then((page) => setForm(toPagePayload(page)))
      .catch(() => setError('Nao foi possivel carregar esta pagina.'));
  }, [id]);

  function updateField<K extends keyof PagePayload>(key: K, value: PagePayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const saved = id ? await updatePage(id, form) : await createPage(form);
      navigate(`/paginas/${saved.id}`);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" fontFamily="Georgia, serif" fontWeight={800}>
          {id ? 'Editar pagina' : 'Nova pagina'}
        </Typography>
        <Typography color="text.secondary">Monte uma entrada com detalhes, memoria afetiva e notas de leitura.</Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper component="form" onSubmit={handleSubmit} variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <TextField required fullWidth label="Titulo" value={form.title} onChange={(e) => updateField('title', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField required fullWidth label="Autor" value={form.author} onChange={(e) => updateField('author', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Genero" value={form.genre} onChange={(e) => updateField('genre', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Editora" value={form.publisher} onChange={(e) => updateField('publisher', e.target.value)} />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField fullWidth type="number" label="Ano" value={form.year ?? ''} onChange={(e) => updateField('year', e.target.value ? Number(e.target.value) : null)} />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField fullWidth type="number" label="Paginas" value={form.pageCount ?? ''} onChange={(e) => updateField('pageCount', e.target.value ? Number(e.target.value) : null)} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="ISBN" value={form.isbn} onChange={(e) => updateField('isbn', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField select fullWidth label="Status" value={form.status} onChange={(e) => updateField('status', e.target.value as ReadingStatus)}>
              {statusOptions.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="date" label="Inicio" InputLabelProps={{ shrink: true }} value={form.startedAt ?? ''} onChange={(e) => updateField('startedAt', e.target.value || null)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="date" label="Conclusao" InputLabelProps={{ shrink: true }} value={form.finishedAt ?? ''} onChange={(e) => updateField('finishedAt', e.target.value || null)} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontWeight={700}>Nota</Typography>
              <Rating value={form.rating} precision={0.5} onChange={(_, value) => updateField('rating', value ?? 0)} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline minRows={2} label="Personagens" value={form.characters} onChange={(e) => updateField('characters', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth multiline minRows={6} label="Resumo" value={form.summary} onChange={(e) => updateField('summary', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth multiline minRows={6} label="Resenha pessoal" value={form.personalReview} onChange={(e) => updateField('personalReview', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar pagina'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
