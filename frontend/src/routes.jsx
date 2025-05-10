import { Routes, Route, Navigate } from 'react-router';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Topics from './pages/Topics';
import Progress from './pages/Progress';
import NotFound from './pages/NotFound';
import { useAuth } from './AuthContext';
import ProtectedComponent from './components/ProtectedComponent';

export default function AppRoutes() {
    const { isAuth } = useAuth();

    return (    
        <Routes>
            <Route index element={isAuth ? <Navigate to="/profile" /> : <Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route
                path="/"
                element={isAuth ? <ProtectedComponent /> : <Navigate to="/login" />}
            >
                <Route path="profile" element={<Dashboard />} />
                <Route path="topics" element={<Topics />} />
                <Route path="progress" element={<Progress />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
