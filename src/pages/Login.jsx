import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://35.201.161.182:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        navigate('/solver');
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #1976d2, #2196f3)',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: 3,
            padding: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Giải Toán
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
            Đăng nhập vào tài khoản của bạn
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Địa chỉ Email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Đăng Nhập
            </Button>
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Chưa có tài khoản?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/register')}
              sx={{ color: '#1976d2', textDecoration: 'none' }}
            >
              Đăng ký
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
