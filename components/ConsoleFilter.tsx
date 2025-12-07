'use client';

import { useEffect } from 'react';

export function ConsoleFilter() {
  useEffect(() => {
    // Filter out distracting Console Ninja / WebSocket errors from extensions
    const filterArgs = (args: any[]) => {
      const msg = args[0];
      return (
        typeof msg === 'string' && 
        (msg.includes('WebSocket connection to') || 
         msg.includes('Console Ninja') ||
         msg.includes('ws://127.0.0.1:60198'))
      );
    };

    const originalError = console.error;
    console.error = (...args) => {
      if (filterArgs(args)) return;
      originalError.apply(console, args);
    };

    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (filterArgs(args)) return;
      originalWarn.apply(console, args);
    };

    const originalLog = console.log;
    console.log = (...args) => {
      if (filterArgs(args)) return;
      originalLog.apply(console, args);
    };
  }, []);

  return null;
}
