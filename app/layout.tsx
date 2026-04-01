import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/components/AuthProvider';
import SpeedOptimizations from '@/components/SpeedOptimizations';

export const metadata: Metadata = {
  title: 'Pulzo Live | Real-Time EV Tracking & Smart Data Analytics',
  description: 'Experience Pulzo Live: The ultimate high-fidelity dashboard for real-time EV tracking, live charts, and smart odds with pixel-perfect data analytics. Optimized for 0.1s speed and 11k+ edge requests.',
  keywords: 'EV Tracking, Live EV Charts, Smart Odds, Data Analytics, Pulzo Live, Real-time EV Alerts, High Performance Dashboard',
  icons: {
    icon: 'https://i.ibb.co/KjB27cBN/9920738.png',
  },
  verification: {
    google: 'IM5Rvqhc6qDE-BET99mbqkvOMwtlwrpC0dEduxj4ZRY',
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
