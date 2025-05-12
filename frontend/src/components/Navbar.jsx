import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [tabIndex, setTabIndex] = useState(false);
    const { isAuth, logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (pathname.startsWith('/profile')) setTabIndex(0);
        else if (pathname.startsWith('/topics')) setTabIndex(1);
        else if (pathname.startsWith('/progress')) setTabIndex(2);
        else setTabIndex(false);
    }, [pathname]);

    const handleTabChange = (_, newIndex) => {
        setTabIndex(newIndex);
        if (newIndex === 0) navigate('/profile');
        if (newIndex === 1) navigate('/topics');
        if (newIndex === 2) navigate('/progress');
    };

    const handleAuthClick = () => {
        if (isAuth) {
            localStorage.removeItem('DSA-Sheet-auth');
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {isAuth && <Tab label="Profile" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: theme.palette.secondary.main } }} />}
                        {isAuth && <Tab label="Topics" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: theme.palette.secondary.main } }} />}
                        {isAuth && <Tab label="Progress" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: theme.palette.secondary.main } }} />}
                    </Tabs>
                </Box>

                {pathname.startsWith('/login') ? (
                    <>
                        {!isAuth && (
                            <Button
                                color="inherit"
                                onClick={() => navigate('/signup')}
                                sx={{ mr: 2, fontWeight: 'bold', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
                            >
                                Signup
                            </Button>
                        )}
                    </>
                ) : (
                    <Button
                        color="inherit"
                        onClick={handleAuthClick}
                        sx={{
                            fontWeight: 'bold',
                            backgroundColor: isAuth ? theme.palette.error.main : theme.palette.success.main,
                            '&:hover': {
                                backgroundColor: isAuth ? theme.palette.error.dark : theme.palette.success.dark,
                            },
                        }}
                    >
                        {isAuth ? 'Logout' : 'Login'}
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
