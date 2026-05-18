import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Header, Footer } from '@/components/Chrome';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'KRAUNO — Your body keeps score of every hour.',
  description: "Considered tools for work, recovery, and rest. We don't carry everything. We carry what works.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header/>
          {children}
          <Footer/>
          <CartDrawer/>
        </CartProvider>
      </body>
    </html>
  );
}
