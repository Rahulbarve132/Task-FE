'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useEffect, useState } from 'react';
import { initializeAuth } from '../redux/slices/authSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    store.dispatch(initializeAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
