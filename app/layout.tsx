import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';
import './globals.css';
import LightRays from './lib/rays';
import Navbar from './components/navbar';
import { ConvexClientProvider } from './ConvexClientProvider';
import Footer from '@/components/footer';

const schibsted = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const martian = Martian_Mono({
  variable: '--font-martian',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Tech Events',
  description: 'A website that lists the best tech events all around the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${schibsted.variable} ${martian.variable} min-h-screen antialiased`}>
        <ConvexClientProvider>
        <Navbar />
          <div className="fixed inset-0 top-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#0270e2"
              raysSpeed={0.5}
              lightSpread={1.8}
              rayLength={2}
              followMouse={true}
              mouseInfluence={0.03}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1.9}
            />
          </div>
          <main>
            {children}
          </main>
        </ConvexClientProvider>
        <Footer />
      </body>
    </html>
  );
}
