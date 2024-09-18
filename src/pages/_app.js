import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from '../lib/detectMobile'; // Import the mobile detection function
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is on a mobile device using the user-agent
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
    if (isMobile(userAgent)) {
      // Redirect mobile users to a "No Access" page or any other action
      router.push('/no-access');
    }

    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableRightClick);

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, and Ctrl+Shift+J for inspecting
    const disableInspectTools = (e) => {
      if (
        e.key === 'F12' || // Disable F12
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) // Disable Ctrl+Shift+I/C/J
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', disableInspectTools);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableInspectTools);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
