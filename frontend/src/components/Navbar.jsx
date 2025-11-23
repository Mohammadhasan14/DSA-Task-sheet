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
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

const ACCENT_COLOR = '#3f51b5';

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [tabIndex, setTabIndex] = useState(false);
    const { isAuth, logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const handleMobileNav = (route) => {
        navigate(route);
        setDrawerOpen(false);
    };

    const handleAuthClick = () => {
        if (isAuth) {
            localStorage.removeItem('DSA-Sheet-auth');
            logout();
            navigate('/login');
        } else {
            navigate('/login');
        }
        setDrawerOpen(false);
    };

    const navItems = [
        { label: "My Profile", route: '/profile', requiredAuth: true },
        { label: "Topics", route: '/topics', requiredAuth: true },
        { label: "Progress", route: '/progress', requiredAuth: true },
    ];

    const LogoText = ({ sx, ...props }) => (
        <Typography
            variant="h5"
            component="div"
            sx={{
                mr: 4,
                fontWeight: 'bold',
                color: theme.palette.text.primary, 
                cursor: 'pointer',
                ...sx
            }}
            onClick={() => { navigate('/'); setDrawerOpen(false); }}
            {...props}
        >
            DSA Sheet
        </Typography>
    );

    const MobileDrawer = (
        <Drawer
            anchor="left" 
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 250,
                    backgroundColor: theme.palette.background.default,
                },
            }}
        >
            <Box
                onClick={() => setDrawerOpen(false)}
                sx={{ textAlign: 'center' }}
            >
                <Toolbar>
                    <LogoText sx={{ mr: 0, display: 'block' }} />
                </Toolbar>
                <Divider />
                <List>
                    {isAuth && navItems.map((item) => (
                        <ListItem
                            button
                            key={item.label}
                            onClick={() => handleMobileNav(item.route)}
                            sx={{
                                bgcolor: pathname.startsWith(item.route) ? `${ACCENT_COLOR}10` : 'inherit',
                                '&:hover': {
                                    bgcolor: theme.palette.action.hover,
                                },
                                '& .MuiListItemText-primary': {
                                    color: pathname.startsWith(item.route) ? ACCENT_COLOR : theme.palette.text.primary,
                                }
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                            />
                        </ListItem>
                    ))}
                    
                    {pathname.startsWith('/login') && !isAuth ? (
                        <ListItem>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => handleMobileNav('/signup')}
                                sx={{
                                    fontWeight: 'bold',
                                    borderRadius: 3,
                                    background: ACCENT_COLOR, 
                                    transition: 'all 0.3s ease',
                                    mt: 1,
                                }}
                            >
                                Sign Up
                            </Button>
                        </ListItem>
                    ) : (
                        <ListItem>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleAuthClick}
                                sx={{
                                    fontWeight: 'bold',
                                    borderRadius: 3,
                                    background: isAuth
                                        ? theme.palette.error.main
                                        : ACCENT_COLOR, 
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isAuth ? 'Logout' : 'Login'}
                            </Button>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <AppBar
            position="sticky"
            elevation={2}
            sx={{
                backgroundColor: theme.palette.background.paper, 
                background: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ py: 1, minHeight: { xs: 70, md: 80 } }}>

                    {isMobile && (
                        <IconButton
                            color="primary" 
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setDrawerOpen(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <LogoText sx={{ display: { xs: 'none', md: 'block' } }} />

                    {isMobile && (
                        <Typography
                            variant="h6"
                            onClick={() => navigate('/')}
                            sx={{
                                fontWeight: 'bold',
                                color: theme.palette.text.primary, 
                                cursor: 'pointer',
                                flexGrow: 1,
                                textAlign: 'left',
                            }}
                        >
                            DSA
                        </Typography>
                    )}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            textColor="primary" 
                            indicatorColor="secondary" 
                            sx={{
                                '& .MuiTabs-indicator': { 
                                    height: 3, 
                                    borderRadius: 2,
                                    backgroundColor: ACCENT_COLOR, 
                                },
                                '& .MuiTabs-flexContainer': { gap: 2 }
                            }}
                        >
                            {isAuth && navItems.map((item) => (
                                <Tab
                                    key={item.label}
                                    label={item.label}
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        minWidth: 100,
                                        color: theme.palette.text.secondary,
                                        '&.Mui-selected': {
                                            color: ACCENT_COLOR, 
                                            transform: 'translateY(-1px)',
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                        borderRadius: 2,
                                        mx: 0.5,
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                        {pathname.startsWith('/login') ? (
                            !isAuth && (
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/signup')}
                                    sx={{
                                        fontWeight: 'bold', px: 3, py: 1, borderRadius: 3,
                                        background: ACCENT_COLOR, 
                                        boxShadow: `0 4px 15px 0 ${ACCENT_COLOR}40`,
                                        '&:hover': { transform: 'translateY(-2px)' }, transition: 'all 0.3s ease',
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
                                    fontWeight: 'bold', px: 3, py: 1, borderRadius: 3,
                                    background: isAuth
                                        ? theme.palette.error.main
                                        : ACCENT_COLOR, 
                                    boxShadow: isAuth
                                        ? `0 4px 15px 0 ${theme.palette.error.main}40`
                                        : `0 4px 15px 0 ${ACCENT_COLOR}40`,
                                    '&:hover': { transform: 'translateY(-2px)' }, transition: 'all 0.3s ease',
                                }}
                            >
                                {isAuth ? 'Logout' : 'Login'}
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            {MobileDrawer}
        </AppBar>
    );
}