import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function MovingButtonMaxPage() {
  const [position, setPosition] = useState({ top: 200, left: 200 });
  const buttonRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Create an Audio object for the background music
    const backgroundMusic = new Audio('/sounds/hard.mp3'); // Ensure you have this file in public/sounds
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
    const newTop = Math.floor(Math.random() * window.innerHeight * 0.9); 
    const newLeft = Math.floor(Math.random() * window.innerWidth * 0.9); 
    setPosition({ top: newTop, left: newLeft });
  };

  const handleSubmit = () => {
    router.push('/thank-you');
  };

  const detectProximity = (e) => {
    const button = buttonRef.current;
    if (button) {
      const buttonRect = button.getBoundingClientRect();
      const distanceX = Math.abs(buttonRect.left - e.clientX);
      const distanceY = Math.abs(buttonRect.top - e.clientY);

      // If the mouse is within 100px of the button, move it (harder)
      if (distanceX < 100 && distanceY < 100) {
        moveButton();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', detectProximity);
    return () => {
      document.removeEventListener('mousemove', detectProximity);
    };
  }, []);

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
        Max Difficulty: Try to catch the button!
      </Typography>
      <Button
        ref={buttonRef}
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleSubmit}
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          transition: 'top 0.05s ease-in-out, left 0.05s ease-in-out', // Faster movement
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
