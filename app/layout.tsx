import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/components/AuthProvider';
import SpeedOptimizations from '@/components/SpeedOptimizations';

export const metadata: Metadata = {
  title: 'Pulzo Live | Real-Time EV Tracking & Smart Data Analytics',
  description: 'Experience Pulzo Live: The ultimate high-fidelity dashboard for real-time EV tracking, live charts, and smart odds with pixel-perfect data analytics.',
  icons: {
    icon: 'https://i.ibb.co/KjB27cBN/9920738.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://i.ibb.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: "document",
                  where: {
                    and: [{ href_matches: "/*" }]
                  },
                  eagerness: "eager"
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
          <SpeedOptimizations />
        </AuthProvider>
      </body>
    </html>
  );
}
