import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa, #e3f2fd)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: 'error.main', mb: 1 }} />
        <Typography variant="h3" color="error" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Paper>
    </Box>
  );
}
