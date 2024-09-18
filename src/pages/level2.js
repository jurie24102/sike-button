import { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function MovingButtonPage() {
  const [position, setPosition] = useState({ top: 200, left: 200 });
  const router = useRouter();

  useEffect(() => {
    // Create an Audio object for the background music
    const backgroundMusic = new Audio('/sounds/more.mp3'); // Ensure you have this file in the public/sounds directory
    backgroundMusic.loop = true; // Loop the music
    backgroundMusic.volume = 1; // Set a comfortable volume level
    backgroundMusic.play(); // Start playing the music

    // Cleanup function to stop the music when the component unmounts
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; // Reset the music to the start when paused
    };
  }, []);

  const moveButton = () => {
    const newTop = Math.floor(Math.random() * window.innerHeight * 0.8); // Keep it within view
    const newLeft = Math.floor(Math.random() * window.innerWidth * 0.8); // Keep it within view
    setPosition({ top: newTop, left: newLeft });
  };

  const handleSubmit = () => {
    // Navigate to /loading2 when the button is caught
    router.push('/loading2');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.paper"
      sx={{ position: 'relative' }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Try to click the submit button!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onMouseEnter={moveButton}
        onClick={handleSubmit}
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          transition: 'top 0.2s ease-in-out, left 0.2s ease-in-out',
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
