import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function ThankYouPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
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
      <Button variant="contained" color="primary" onClick={handleBackToHome}>
        Go Home 🤣
      </Button>
    </Box>
  );
}
