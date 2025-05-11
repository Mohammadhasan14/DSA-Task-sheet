import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [tabIndex, setTabIndex] = useState(false);
    const { isAuth, logout } = useAuth();


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
            logout()
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                    >
                        {isAuth && <Tab label="Profile" />}
                        {isAuth && <Tab label="Topics" />}
                        {isAuth && <Tab label="Progress" />}
                    </Tabs>
                </Box>

                {pathname.startsWith('/login') ?
                    <>
                        {!isAuth && <Button
                            color="inherit"
                            onClick={() => navigate(isAuth ? '/signup' : '/signup')}
                            // sx={{ mr: 2 }}
                        >
                            Signup
                        </Button>}
                    </> :
                    <Button color="inherit" onClick={handleAuthClick}>
                        {isAuth ? 'Logout' : 'Login'}
                    </Button>
                }
            </Toolbar>
        </AppBar>
    );
}
