import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Box minHeight="100vh">
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(12px)' }}>
        <Toolbar sx={{ borderBottom: '1px solid rgba(84, 70, 56, 0.16)' }}>
          <Stack direction="row" spacing={1.5} alignItems="center" flexGrow={1}>
            <AutoStoriesIcon color="secondary" />
            <Typography variant="h6" fontFamily="Georgia, serif" fontWeight={800}>
              Reading Journal
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} to="/" startIcon={<HomeIcon />} color="primary">
              Inicio
            </Button>
            <Button component={RouterLink} to="/diario" startIcon={<BookIcon />} color="primary">
              Meu Livro
            </Button>
            <Button component={RouterLink} to="/paginas/nova" startIcon={<NoteAddIcon />} variant="contained">
              Nova
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {children}
      </Container>
    </Box>
  );
}
