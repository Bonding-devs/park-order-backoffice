import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './common/LoaderPage/index.tsx';
import { AuthProvider } from './context/AuthContext'; // Importar AuthProvider
import AppRoutes from './routes/AppRoutes.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
