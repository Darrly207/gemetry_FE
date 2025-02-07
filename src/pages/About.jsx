import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: '#2C3E50',
            textAlign: 'center',
            mb: 6
          }}
        >
          Về Chúng Tôi
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                backgroundColor: 'rgba(68, 97, 242, 0.04)',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
                Sứ Mệnh
              </Typography>
              <Typography variant="body1" paragraph>
                Chúng tôi nỗ lực để làm cho toán học trở nên dễ tiếp cận và dễ hiểu với tất cả mọi người. 
                Nền tảng được hỗ trợ bởi AI của chúng tôi giúp học sinh giải quyết các bài toán phức tạp 
                với những giải thích chi tiết từng bước.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                backgroundColor: 'rgba(68, 97, 242, 0.04)',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
                Công Nghệ
              </Typography>
              <Typography variant="body1" paragraph>
                Được hỗ trợ bởi các thuật toán AI và máy học tiên tiến, giải pháp của chúng tôi 
                cung cấp lời giải chính xác và chi tiết cho nhiều loại bài toán khác nhau, 
                từ số học cơ bản đến giải tích phức tạp.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 