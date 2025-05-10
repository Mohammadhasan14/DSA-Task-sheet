import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('DSA-Sheet-auth'));
    if (authData?.user) {
      setUser(authData.user);
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome to DSA Sheet 🎯
          </Typography>

          {user ? (
            <Box>
              <Typography variant="body1">
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
