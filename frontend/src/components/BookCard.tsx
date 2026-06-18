import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, ButtonBase, Chip, Rating, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { PageListItem } from '../types/page';
import { statusLabel } from '../utils/status';

type BookCardProps = {
  page: PageListItem;
};

export function BookCard({ page }: BookCardProps) {
  return (
    <ButtonBase
      component={RouterLink}
      to={`/paginas/${page.id}`}
      sx={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: '1px solid rgba(84, 70, 56, 0.18)',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transform: 'rotate(-0.4deg)',
        transition: '180ms ease',
        '&:hover': { transform: 'translateY(-3px) rotate(0deg)', boxShadow: '0 16px 30px rgba(75, 57, 41, 0.14)' },
      }}
    >
      <Box
        sx={{
          height: 150,
          bgcolor: '#e9d9cc',
          backgroundImage: page.coverImageUrl ? `url(${page.coverImageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px dashed rgba(84, 70, 56, 0.3)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {!page.coverImageUrl && <MenuBookIcon sx={{ fontSize: 52, color: 'rgba(84, 70, 56, 0.42)' }} />}
      </Box>
      <Stack spacing={1.2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" gap={1}>
          <Chip label={statusLabel[page.status]} size="small" color="secondary" variant="outlined" />
          <Rating value={Number(page.rating)} precision={0.5} size="small" readOnly />
        </Stack>
        <Box>
          <Typography variant="h6" fontFamily="Georgia, serif" fontWeight={800} noWrap>
            {page.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {page.author}
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.8} alignItems="center" color="text.secondary">
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="caption">{new Date(page.createdAt).toLocaleDateString('pt-BR')}</Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
}
