import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const IDLE_TIMEOUT = 2 * 60 * 1000; // 2 minutes

export function useIdleTimer() {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Only set timer if not on idle screen or admin routes
    if (location.pathname !== '/' && !location.pathname.startsWith('/admin')) {
      timerRef.current = setTimeout(() => {
        navigate('/');
      }, IDLE_TIMEOUT);
    }
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [location.pathname]);
}
