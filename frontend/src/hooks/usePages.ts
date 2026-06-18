import { useCallback, useEffect, useState } from 'react';
import { getPages } from '../services/pagesApi';
import type { PageListItem } from '../types/page';

export function usePages() {
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setPages(await getPages());
    } catch {
      setError('Nao foi possivel carregar o diario.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { pages, loading, error, reload: load };
}
