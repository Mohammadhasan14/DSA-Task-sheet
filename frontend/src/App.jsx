import { BrowserRouter } from 'react-router';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
