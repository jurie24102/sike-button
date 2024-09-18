import { Typography, Box } from '@mui/material';

export default function NoAccessPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.paper"
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Access Denied
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        This website is not accessible on small devices.
      </Typography>
    </Box>
  );
}
