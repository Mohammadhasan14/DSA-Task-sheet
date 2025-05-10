import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Paper,
  Stack
} from '@mui/material';

export default function Progress() {
  const [progressData, setProgressData] = useState({});
  const token = JSON.parse(localStorage.getItem('DSA-Sheet-auth'))?.token;

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/topics/progress-report', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProgressData(data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };
    fetchProgress();
  }, [token]);

  const getValue = (str) => parseFloat(str?.replace('%', '') || 0);
  const levels = [
    { label: 'Easy', color: 'success' },
    { label: 'Medium', color: 'warning' },
    { label: 'Hard', color: 'error' },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Progress Overview
      </Typography>
      <Stack spacing={2}>
        {levels.map(({ label, color }) => (
          <Paper key={label} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>{label}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LinearProgress
                variant="determinate"
                value={getValue(progressData[label])}
                color={color}
                sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
              />
              <Typography sx={{ ml: 2 }} variant="body2" color="text.secondary">
                {progressData[label] || '0%'}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
