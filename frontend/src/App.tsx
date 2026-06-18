import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { DiaryPage } from './pages/DiaryPage';
import { HomePage } from './pages/HomePage';
import { PageEditor } from './pages/PageEditor';
import { PageView } from './pages/PageView';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diario" element={<DiaryPage />} />
        <Route path="/paginas/nova" element={<PageEditor />} />
        <Route path="/paginas/:id" element={<PageView />} />
        <Route path="/paginas/:id/editar" element={<PageEditor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
