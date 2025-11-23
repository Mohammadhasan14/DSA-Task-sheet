import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material';
import { useAuth } from '../AuthContext';
import {
  CheckCircle,
  TrendingUp,
  EmojiEvents,
  Speed
} from '@mui/icons-material';
import { API_URL } from '../utils/url';
import Loader from '../components/Global/Loader';

const CARD_MIN_HEIGHT = 200; 

export default function Progress() {
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem('DSA-Sheet-auth'))?.token;
  const { logout } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/topics/progress-report`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 404) {
          logout();
          return;
        }

        const data = await res.json();
        setProgressData(data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [token, logout]);

  const getValue = (str) => parseFloat(str?.replace('%', '') || 0);
  
  const levels = [
    { 
      label: 'Easy', 
      color: 'success', 
      icon: <CheckCircle />,
      description: 'Basic problems mastered'
    },
    { 
      label: 'Medium', 
      color: 'warning', 
      icon: <TrendingUp />,
      description: 'Intermediate challenges'
    },
    { 
      label: 'Hard', 
      color: 'error', 
      icon: <EmojiEvents />,
      description: 'Advanced concepts'
    },
  ];

  const calculateOverallProgress = () => {
    const values = levels.map(level => getValue(progressData[level.label]));
    if (values.length === 0) return 0; 
    const sum = values.reduce((sum, value) => sum + value, 0);
    return sum / values.length;
  };

  const overallProgress = calculateOverallProgress();

  if (loading) {
    return (
      <Loader loaderText="Loading your progress..." theme={theme} />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, p: { xs: 1, sm: 2 } }}> 
      
      <Box textAlign="center" mb={{ xs: 3, md: 6 }}>
        <Typography 
          variant={ 'h4' } 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '1.8rem', sm: '2.5rem' }, 
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Progress Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.25rem' } 
          }}
        >
          Track your DSA learning journey and monitor your improvement across different difficulty levels
        </Typography>
      </Box>

      <Card 
        sx={{ 
          mb: { xs: 3, md: 4 }, 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 4,
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
            <CircularProgress
              variant="determinate"
              value={overallProgress}
              size={{ xs: 100, sm: 120 }} 
              thickness={4}
              sx={{ color: theme.palette.primary.main }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography 
                variant="h5" 
                component="div" 
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.4rem', sm: '1.5rem' } }} 
              >
                {Math.round(overallProgress)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Speed sx={{ color: theme.palette.primary.main }} />
            Overall Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your combined performance across all difficulty levels
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ display: 'flex', justifyContent: 'center', width: '100%', m: 0 }}>
        {levels.map(({ label, color, icon, description }) => {
          const progressValue = getValue(progressData[label]);
          const getColor = (value) => {
            if (value >= 80) return 'success';
            if (value >= 50) return 'warning';
            return 'error';
          };

          return (
            <Grid item xs={12} sm={6} md={4} key={label} sx={{ width: 'auto' }}> 
              <Card 
                sx={{ 
                  minHeight: CARD_MIN_HEIGHT,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column', 
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 40px ${alpha(theme.palette[color].main, 0.15)}`,
                  },
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1, 
                        borderRadius: 2, 
                        backgroundColor: alpha(theme.palette[color].main, 0.1),
                        color: theme.palette[color].main,
                        mr: 2
                      }}
                    >
                      {icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Completion
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color={`${color}.main`}>
                        {progressData[label] || '0%'}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progressValue}
                      color={getColor(progressValue)}
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: alpha(theme.palette[color].main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                        }
                      }}
                    />
                  </Box>

                  <Chip
                    label={progressValue >= 80 ? 'Excellent' : progressValue >= 50 ? 'Good' : 'Needs Work'}
                    color={getColor(progressValue)}
                    variant={progressValue >= 80 ? 'filled' : 'outlined'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}