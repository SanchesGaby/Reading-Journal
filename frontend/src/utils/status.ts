import type { ReadingStatus } from '../types/page';

export const statusLabel: Record<ReadingStatus, string> = {
  Wishlist: 'Quero ler',
  Reading: 'Lendo',
  Finished: 'Concluido',
  Paused: 'Pausado',
  Abandoned: 'Abandonado',
};

export const statusOptions = Object.entries(statusLabel).map(([value, label]) => ({ value: value as ReadingStatus, label }));
