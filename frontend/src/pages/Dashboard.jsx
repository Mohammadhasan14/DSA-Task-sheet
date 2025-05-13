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
        // minHeight: '100vh',
        // background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 9,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 4,
            p: 3,
            // mb: 60,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                Welcome to DSA Sheet 🎯
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {user ? (
              <Box sx={{ ml: 1 }}>
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
