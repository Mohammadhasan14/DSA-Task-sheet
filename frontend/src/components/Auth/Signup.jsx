import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = await res.json();
      console.log("payload",payload);
      
      if (!res.ok) {
        if (payload.errors) {
          payload.errors.forEach(({ field, message }) => {
            setError(field, { type: 'server', message });
          });
        }
        throw new Error(payload.message || 'Signup failed');
      }

      navigate('/login', { replace: true });
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        {...register('username', {
          required: 'Username is required',
          minLength: { value: 3, message: 'At least 3 characters' },
        })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value:
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Enter a valid email address',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Min 6 characters' },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Signing up…' : 'Sign Up'}
      </Button>
    </Box>
  );
}
