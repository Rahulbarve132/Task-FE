import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '../components/ReduxProvider';
import { ConsoleFilter } from '../components/ConsoleFilter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Tracker',
  description: 'A modern task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ConsoleFilter />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
