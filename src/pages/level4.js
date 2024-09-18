import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function MovingButtonBerserkPage() {
  const [position, setPosition] = useState({ top: 200, left: 200 });
  const buttonRef = useRef(null);
  const router = useRouter();
  const intervalRef = useRef(null);

  useEffect(() => {
    // Create an Audio object for the background music
    const backgroundMusic = new Audio('/sounds/berserk.mp3'); // Ensure you have this file in public/sounds
    backgroundMusic.loop = true; // Loop the music
    backgroundMusic.volume = 1; // Set a comfortable volume level
    backgroundMusic.play(); // Start playing the music

    // Cleanup function to stop the music when the component unmounts
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; // Reset the music to the start when paused
    };
  }, []);

  useEffect(() => {
    // Move the button at a rapid pace, without waiting for proximity detection
    intervalRef.current = setInterval(() => {
      const newTop = Math.floor(Math.random() * window.innerHeight * 0.9); // Max height movement
      const newLeft = Math.floor(Math.random() * window.innerWidth * 0.9); // Max width movement
      setPosition({ top: newTop, left: newLeft });
    }, 100); // Update position every 100 milliseconds

    return () => {
      clearInterval(intervalRef.current); // Clear the interval when component unmounts
    };
  }, []);

  const handleSubmit = () => {
    alert('You caught the berserk button!');
    router.push('/loading3');
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
        Berserk Mode: Can you catch the button?!
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
          transition: 'top 0.05s ease-in-out, left 0.05s ease-in-out',
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
