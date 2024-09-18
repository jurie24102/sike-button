import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

export default function LoadingPage() {
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState('background.paper'); // Default background color

  useEffect(() => {
    // Function to trigger Text-to-Speech with louder volume
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 1; // Max volume for the speech (range is 0 to 1)
      speechSynthesis.speak(utterance);
    };

    // Call the speech function once
    speak('Commencing difficulty...Level 4...');

    // Create an Audio object for the siren sound
    const siren = new Audio('/sounds/siren.mp3'); // Ensure you have this file in the public/sounds directory
    siren.loop = true; // Loop the siren sound
    siren.volume = 0.1; // Start with low volume
    siren.play();

    // Gradually increase the volume of the siren
    let volume = 0.1;
    const volumeIncreaseInterval = setInterval(() => {
      volume = Math.min(volume + 0.1, 0.5); // Ensure the volume does not exceed 0.5
      siren.volume = volume;
    }, 300); // Increase volume every 300ms

    // Simulate flashing lights by toggling the background color
    const flashLightsInterval = setInterval(() => {
      setBackgroundColor((prevColor) =>
        prevColor === 'background.paper' ? '#ff0000' : 'background.paper' // Toggle between default and red
      );
    }, 500); // Flash every 500ms

    // Redirect to the next difficulty page after 5 seconds and stop the siren
    const timer = setTimeout(() => {
      clearInterval(volumeIncreaseInterval); // Stop increasing volume
      clearInterval(flashLightsInterval); // Stop flashing lights
      siren.pause(); // Stop the siren sound
      router.push('/level4'); // Redirect to the next page
    }, 5000);

    // Cleanup both the timer, flashing lights, and the siren sound when the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(volumeIncreaseInterval);
      clearInterval(flashLightsInterval);
      siren.pause(); // Ensure siren stops if user leaves early
    };
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor={backgroundColor} // Dynamic background color
      sx={{ transition: 'background-color 0.5s' }} // Smooth transition for flashing effect
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Increasing difficulty...
      </Typography>
      <CircularProgress />
    </Box>
  );
}
