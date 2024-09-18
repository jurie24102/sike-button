import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function StartPage() {
  const [countdown, setCountdown] = useState(5); // Start countdown from 5 seconds
  const router = useRouter();

  useEffect(() => {
    // Countdown effect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // Decrease every second
      return () => clearTimeout(timer); // Clean up on unmount
    } else {
      // Redirect to level1 when countdown finishes
      router.push('/level1');
    }
  }, [countdown, router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.paper"
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Get Ready!
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        The game will start in {countdown}...
      </Typography>
    </Box>
  );
}
