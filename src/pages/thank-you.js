import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ThankYouPage() {
  const router = useRouter();
  const [position, setPosition] = useState({top: "", left: ""});

  const handleBackToHome = () => {
    router.push('/');
  };

  const moveButton = () => {
    const newTop = Math.floor(Math.random() * window.innerHeight * 0.8); 
    const newLeft = Math.floor(Math.random() * window.innerWidth * 0.8); 
    setPosition({ top: newTop, left: newLeft });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.paper"
      sx={{ textAlign: 'center' }}
    >
      <Typography variant="h2" color="primary" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
        Your efforts has been useless.
      </Typography>
      <Button sx={{
          top: position.top,
          left: position.left,
          transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out',
        }}
     onMouseEnter={moveButton} variant="contained" color="primary" onClick={handleBackToHome}>
        Go Home 🤣
      </Button>
    </Box>
  );
}
