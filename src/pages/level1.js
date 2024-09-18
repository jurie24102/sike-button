import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function MovingButtonPage() {
  const [position, setPosition] = useState({ top: 200, left: 200 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // State to track if the music has started
  const loFiMusicRef = useRef(null); // Reference to the music object
  const router = useRouter();

  useEffect(() => {
    // Create an Audio object for lo-fi beats, but don't play it yet
    loFiMusicRef.current = new Audio('/sounds/lofi.mp3'); // Ensure you have this file in public/sounds
    loFiMusicRef.current.loop = true; // Loop the music
    loFiMusicRef.current.volume = 1; // Set a comfortable volume level

    // Cleanup function to stop the music when component unmounts
    return () => {
      if (loFiMusicRef.current) {
        loFiMusicRef.current.pause();
        loFiMusicRef.current.currentTime = 0; // Reset the music to the start when paused
      }
    };
  }, []);

  const playMusic = () => {
    if (loFiMusicRef.current && !isMusicPlaying) {
      loFiMusicRef.current.play(); // Play the music after user interaction
      setIsMusicPlaying(true); // Mark that the music is now playing
    }
  };

  const moveButton = () => {
    playMusic(); // Start music when user interacts with the button
    const newTop = Math.floor(Math.random() * window.innerHeight * 0.8); 
    const newLeft = Math.floor(Math.random() * window.innerWidth * 0.8); 
    setPosition({ top: newTop, left: newLeft });
  };

  const handleSubmit = () => {
    // Navigate to /loading when the button is caught
    router.push('/loading');
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
        onMouseEnter={moveButton} // Music starts playing when user hovers
        onClick={handleSubmit}
        sx={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out',
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
