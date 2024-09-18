import { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Function to trigger Text-to-Speech with louder volume
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 1; // Max volume for the speech (range is 0 to 1)
      speechSynthesis.speak(utterance);
    };

    // Call the speech function once
    speak('Commencing difficulty...Level 3...');

    // Create an Audio object for the siren sound
    const siren = new Audio('/sounds/siren.mp3'); // Assuming you have a siren.mp3 file in the public/sounds directory
    siren.loop = true; // Loop the siren sound
    siren.volume = 0.1; // Start with low volume
    siren.play();

    // Gradually increase the volume of the siren
    let volume = 0.1;
    const volumeIncreaseInterval = setInterval(() => {
      volume = Math.min(volume + 0.1, 0.5); // Ensure the volume does not exceed 1
      siren.volume = volume;
    }, 300); // Increase volume every 300ms

    // Redirect to the next difficulty page after 5 seconds and stop the siren
    const timer = setTimeout(() => {
      clearInterval(volumeIncreaseInterval); // Stop increasing volume
      siren.pause(); // Stop the siren sound
      router.push('/level3'); // Redirect to the next page
    }, 5000);

    // Cleanup both the timer and the siren sound when the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(volumeIncreaseInterval);
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
      bgcolor="background.paper"
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Increasing difficulty...
      </Typography>
      <CircularProgress />
    </Box>
  );
}
