import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'Pulzo Live | Real-Time EV Tracking & Smart Data Analytics',
  description: 'Experience Pulzo Live: The ultimate high-fidelity dashboard for real-time EV tracking, live charts, and smart odds with pixel-perfect data analytics.',
  icons: {
    icon: 'https://i.ibb.co/3yXgnVWS/Modern-P-logo-on-gradient-background.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
