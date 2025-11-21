import { useState, useEffect } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Tabs, 
    Tab, 
    Button, 
    Box, 
    useTheme, 
    useMediaQuery,
    Typography,
    Container
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [tabIndex, setTabIndex] = useState(false);
    const { isAuth, logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (pathname.startsWith('/profile')) setTabIndex(0);
        else if (pathname.startsWith('/topics')) setTabIndex(1);
        else if (pathname.startsWith('/progress')) setTabIndex(2);
        else setTabIndex(false);
    }, [pathname]);

    const handleTabChange = (_, newIndex) => {
        setTabIndex(newIndex);
        const routes = ['/profile', '/topics', '/progress'];
        if (routes[newIndex]) {
            navigate(routes[newIndex]);
        }
    };

    const handleAuthClick = () => {
        if (isAuth) {
            localStorage.removeItem('DSA-Sheet-auth');
            logout();
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar 
            position="sticky" 
            elevation={2}
            sx={{ 
                backgroundColor: theme.palette.background.paper,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ py: 1, minHeight: { xs: 70, md: 80 } }}>
                    <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                            mr: 4,
                            fontWeight: 'bold',
                            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' }
                        }}
                        onClick={() => navigate('/')}
                    >
                        DSA Sheet
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            textColor="inherit"
                            indicatorColor="secondary"
                            sx={{ 
                                '& .MuiTabs-indicator': {
                                    height: 3,
                                    borderRadius: 2,
                                },
                                '& .MuiTabs-flexContainer': {
                                    gap: { xs: 1, md: 2 },
                                }
                            }}
                        >
                            {isAuth && (
                                <Tab 
                                    label={isMobile ? "Profile" : "My Profile"} 
                                    sx={{ 
                                        fontWeight: 600,
                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                        minWidth: { xs: 80, md: 100 },
                                        color: 'white',
                                        '&.Mui-selected': { 
                                            color: theme.palette.secondary.main,
                                            transform: 'translateY(-1px)',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                        borderRadius: 2,
                                        mx: 0.5,
                                    }} 
                                />
                            )}
                            {isAuth && (
                                <Tab 
                                    label="Topics" 
                                    sx={{ 
                                        fontWeight: 600,
                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                        minWidth: { xs: 80, md: 100 },
                                        color: 'white',
                                        '&.Mui-selected': { 
                                            color: theme.palette.secondary.main,
                                            transform: 'translateY(-1px)',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                        borderRadius: 2,
                                        mx: 0.5,
                                    }} 
                                />
                            )}
                            {isAuth && (
                                <Tab 
                                    label="Progress" 
                                    sx={{ 
                                        fontWeight: 600,
                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                        minWidth: { xs: 80, md: 100 },
                                        color: 'white',
                                        '&.Mui-selected': { 
                                            color: theme.palette.secondary.main,
                                            transform: 'translateY(-1px)',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                        borderRadius: 2,
                                        mx: 0.5,
                                    }} 
                                />
                            )}
                        </Tabs>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {pathname.startsWith('/login') ? (
                            !isAuth && (
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/signup')}
                                    sx={{ 
                                        fontWeight: 'bold',
                                        px: 3,
                                        py: 1,
                                        borderRadius: 3,
                                        background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                                        boxShadow: `0 4px 15px 0 ${theme.palette.success.main}40`,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 6px 20px 0 ${theme.palette.success.main}60`,
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Sign Up
                                </Button>
                            )
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleAuthClick}
                                sx={{
                                    fontWeight: 'bold',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 3,
                                    background: isAuth 
                                        ? `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.light})`
                                        : `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                                    boxShadow: isAuth 
                                        ? `0 4px 15px 0 ${theme.palette.error.main}40`
                                        : `0 4px 15px 0 ${theme.palette.success.main}40`,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: isAuth 
                                            ? `0 6px 20px 0 ${theme.palette.error.main}60`
                                            : `0 6px 20px 0 ${theme.palette.success.main}60`,
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isAuth ? 'Logout' : 'Login'}
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}