import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Topics from './pages/Topics';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
    //   const isAuthenticated = Boolean(localStorage.getItem('token'));
    const isAuthenticated = true;

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="signup" element={<Signup />} />
                <Route
                    path="dashboard/*"
                    element={
                        isAuthenticated
                            ? <Dashboard />
                            : <Navigate to="/" replace />
                    }
                />
                <Route
                    path="topics"
                    element={
                        isAuthenticated
                            ? <Topics />
                            : <Navigate to="/" replace />
                    }
                />
                <Route
                    path="progress"
                    element={
                        isAuthenticated
                            ? <Progress />
                            : <Navigate to="/" replace />
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
