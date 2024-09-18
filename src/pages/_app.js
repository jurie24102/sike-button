import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import "@/styles/globals.css";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const [clickCount, setClickCount] = useState(0); 
  const [openDialog, setOpenDialog] = useState(false); 
  const [banMessage, setBanMessage] = useState(''); 
  const [dialogLocked, setDialogLocked] = useState(false); 
  const [clickTimeout, setClickTimeout] = useState(null); 
  const [countdown, setCountdown] = useState(10); // 10-second countdown timer
  const [isBanned, setIsBanned] = useState(false); // Keep track of banned status
  const router = useRouter();

  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableRightClick);

    const disableDevToolsShortcuts = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || 
        (e.ctrlKey && e.key === 'U') 
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', disableDevToolsShortcuts);

    const disableKeyboardButtonPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); 
      }
    };
    document.addEventListener('keydown', disableKeyboardButtonPress);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableDevToolsShortcuts);
      document.removeEventListener('keydown', disableKeyboardButtonPress);
    };
  }, []);

  useEffect(() => {
    const isBanned = localStorage.getItem('banned');
    if (isBanned) {
      setBanMessage('You are banned for ignoring the rules.');
      setOpenDialog(true);
      setDialogLocked(true); 
      setIsBanned(true);
      startCountdown();
      return;
    }
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (dialogLocked) return;

      setClickCount((prev) => {
        if (prev >= 4) {
          handleViolation();
          return 0; 
        }
        return prev + 1; 
      });

      if (clickTimeout) clearTimeout(clickTimeout); 
      const timeout = setTimeout(() => {
        setClickCount(0); 
      }, 1000); 
      setClickTimeout(timeout); 
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (clickTimeout) clearTimeout(clickTimeout); 
    };
  }, [clickCount, clickTimeout, dialogLocked]);

  
  const handleViolation = () => {
    let violationCount = parseInt(localStorage.getItem('violationCount') || '0');

    violationCount += 1;
    localStorage.setItem('violationCount', violationCount);

    if (violationCount >= 3) {
      setBanMessage('You are banned for ignoring the rules.');
      localStorage.setItem('banned', true); 
      setIsBanned(true);
      startCountdown();
    } else {
      setBanMessage('No rapid clicking allowed!'); // Show warning message before ban
    }

    setOpenDialog(true); 
    setDialogLocked(true); 
  };

  const startCountdown = () => {
    let timeLeft = 30;
    const countdownInterval = setInterval(() => {
      setCountdown(timeLeft);
      timeLeft -= 1;

      if (timeLeft < 0) {
        clearInterval(countdownInterval);
        handleUnban();
      }
    }, 1000); // Decrease countdown every second
  };

  const handleUnban = () => {
    localStorage.removeItem('banned');
    localStorage.setItem('violationCount', '0'); // Reset violation count
    setBanMessage('You have been unbanned!');
    setIsBanned(false);
    setDialogLocked(false); 
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }

    // If "OK" is clicked after the unban message, clear localStorage and close the dialog.
    if (!isBanned && banMessage === 'You have been unbanned!') {
      localStorage.clear(); // Clear all localStorage data when unbanned
      setBanMessage(''); // Reset ban message after unban
    }

    setOpenDialog(false); 
    setDialogLocked(false); 
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        router.push('/no-access'); // Redirect to no-access page if screen is too wide
      }
    };

    handleResize(); // Check the screen size on initial load
    window.addEventListener('resize', handleResize); // Check on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, [router]);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        disableEscapeKeyDown 
      >
        <DialogTitle>{isBanned ? 'Banned' : 'Warning'}</DialogTitle>
        <DialogContent>
          {isBanned && countdown > 0 ? (
            <Typography>{`You are banned for ignoring the rules.`}</Typography>
          ) : (
            <Typography>{banMessage || 'No rapid clicking allowed!'}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {countdown ? (
            <Typography>{`You will be unbanned in ${countdown} seconds.`}</Typography>
          ) : (
            <Button
            onClick={handleClose}
            color="primary"
            tabIndex={-1} 
          >
            {isBanned ? '' : 'OK'}
          </Button>
          )
          }
        </DialogActions>
      </Dialog>

      <Component {...pageProps} />
    </>
  );
}
