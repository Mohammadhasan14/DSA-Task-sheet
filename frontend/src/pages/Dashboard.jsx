import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('DSA-Sheet-auth'));
    if (authData?.user) {
      setUser(authData.user);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        p: { xs: 3, md: 5 }, 
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 8, 
            p: { xs: 1, sm: 3 }, 
            width: '100%', 
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1.5, sm: 2 },
                mb: 2,
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }}>
                <PersonIcon />
              </Avatar>
              <Typography 
                variant={ 'h5' }
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                Welcome to DSA Sheet 🎯
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {user ? (
              <Box sx={{ ml: { xs: 0, sm: 1 } }}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Username:</strong> {user.username}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
