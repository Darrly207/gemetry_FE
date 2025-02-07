import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FunctionsIcon from '@mui/icons-material/Functions';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const isAuthPage = ['/login', '/register', '/settings', '/solver'].includes(location.pathname);
  const username = localStorage.getItem('username') || 'User';
  const userInitial = username ? username.charAt(0).toUpperCase() : 'U';

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      className="navbar"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
        <Toolbar 
          sx={{ 
            minHeight: '30px !important',
            padding: '0 !important',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* Left side - Logo, Brand and Navigation */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1
          }}>
            {/* Logo and Brand */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              <FunctionsIcon sx={{ fontSize: 28, color: '#4461F2' }} />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 600,
                  color: '#2C3E50',
                  display: { xs: 'none', sm: 'block' },
                  fontSize: '1.2rem'
                }}
              >
                Gemetry
              </Typography>
            </Box>

            {/* Navigation Links */}
            {!isAuthPage && (
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                '& .MuiButton-root': {
                  color: '#2C3E50',
                  fontWeight: 500,
                  minWidth: 'auto',
                  fontSize: '1rem',
                  padding: '4px 16px',
                  '&:hover': {
                    backgroundColor: 'rgba(68, 97, 242, 0.04)'
                  }
                }
              }}>
                <Button 
                  onClick={() => navigate('/')}
                  sx={{ 
                    borderBottom: location.pathname === '/' ? '2px solid #4461F2' : '2px solid transparent',
                    borderRadius: 0
                  }}
                >
                  Trang chủ
                </Button>
                <Button 
                  onClick={() => navigate('/about')}
                  sx={{ 
                    borderBottom: location.pathname === '/about' ? '2px solid #4461F2' : '2px solid transparent',
                    borderRadius: 0
                  }}
                >
                  Về chúng tôi
                </Button>
              </Box>
            )}
          </Box>

          {/* Right side - Auth */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Typography 
                  sx={{ 
                    color: '#2C3E50',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {username}
                </Typography>
                <IconButton 
                  onClick={handleClick}
                  sx={{ 
                    width: '36px',
                    height: '36px',
                    padding: 0
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 36, 
                      height: 36,
                      bgcolor: '#4461F2',
                      fontSize: '1rem'
                    }}
                  >
                    {userInitial}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      minWidth: 150,
                      '& .MuiMenuItem-root': {
                        fontSize: '1rem'
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => navigate('/settings')} sx={{ gap: 1.5 }}>
                    <SettingsIcon sx={{ fontSize: 20 }} />
                    Cài đặt
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ gap: 1.5 }}>
                    <LogoutIcon sx={{ fontSize: 20 }} />
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderColor: '#4461F2',
                    color: '#4461F2',
                    py: 0.5,
                    px: 3,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#2941F0',
                      backgroundColor: 'rgba(68, 97, 242, 0.04)'
                    }
                  }}
                >
                  Đăng nhập
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#4461F2',
                    py: 0.5,
                    px: 3,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: '#2941F0'
                    }
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 