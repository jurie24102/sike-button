import { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Function to trigger Text-to-Speech
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };

    // Call the speech function
    speak('Increasing difficulty...Level 2...');

    // Redirect to the max difficulty page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/level2');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
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
        Increasing difficulty...Level 2...
      </Typography>
      <CircularProgress />
    </Box>
  );
}
