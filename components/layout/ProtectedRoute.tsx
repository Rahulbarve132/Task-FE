'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Loader } from '../ui/Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    // We check token as well because isAuthenticated might take a moment to sync from localStorage
    if (!token && !loading) {
      router.push('/login');
    }
  }, [token, loading]);



  if (!isAuthenticated && !token) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
