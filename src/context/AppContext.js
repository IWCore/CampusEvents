import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { notifyNow, setupNotifications } from '../utils/notifications';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // array of event ids (shared state)
  const [resumeCount, setResumeCount] = useState(0);
  const [lastResumed, setLastResumed] = useState(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    setupNotifications();

    // AppState: detect background -> foreground
    const sub = AppState.addEventListener('change', (next) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        setResumeCount((c) => c + 1);
        setLastResumed(new Date().toLocaleTimeString());
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, []);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (event) => {
    if (isFavorite(event.id)) {
      setFavorites((f) => f.filter((x) => x !== event.id));
    } else {
      setFavorites((f) => [...f, event.id]);
      notifyNow('Event bookmarked!', `${event.title} was added to your favorites.`);
    }
  };

  return (
    <AppContext.Provider value={{ favorites, isFavorite, toggleFavorite, resumeCount, lastResumed }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
