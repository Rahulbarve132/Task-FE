'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Loader } from '../ui/Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, token, isInitialized } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If initialized, not authenticated and not loading, redirect to login
    if (isInitialized && !token && !loading) {
      router.push('/login');
    }
  }, [token, loading, isInitialized]);



  if (!isInitialized || loading) {
    return null; // Or a loader if preferred, but null avoids flash
  }

  if (!isAuthenticated && !token) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
