import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [solution, setSolution] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');
    setSolution('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/problems/solve', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setSolution(data.solution);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Math Problem Solver
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" align="center" gutterBottom>
        Upload an image of your math problem to get the solution
      </Typography>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="image-upload"
        />
        {!imagePreview ? (
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              size="large"
            >
              Choose Image
            </Button>
          </label>
        ) : (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                mb: 2, 
                maxWidth: '500px', 
                margin: '0 auto',
                position: 'relative' 
              }}
            >
              <img
                src={imagePreview}
                alt="Problem preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                }}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </Button>
                <Button
                  variant="contained"
                  onClick={handleFileUpload}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Solve Problem'}
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </div>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {(solution || loading) && (
        <Paper sx={{ mt: 4, p: 3, bgcolor: '#f8f8f8', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Solution:
          </Typography>
          <Box sx={{ 
            mt: 2,
            '& p': { margin: '0.5em 0' },
            '& pre': {
              backgroundColor: '#f1f1f1',
              padding: '0.5em',
              borderRadius: '4px',
              overflowX: 'auto'
            },
            '& code': {
              fontFamily: 'monospace'
            }
          }}>
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="textSecondary">
                  Generating solution...
                </Typography>
              </Box>
            ) : (
              <ReactMarkdown>{solution}</ReactMarkdown>
            )}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Home; 