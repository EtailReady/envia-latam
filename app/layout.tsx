import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Envia Latam — Encuentra couriers confiables a Latinoamérica',
  description: 'Directorio de couriers y empresas de carga desde USA hacia Venezuela, Colombia, Chile, México y toda Latinoamérica. Compara tarifas, ratings y servicios.',
  keywords: 'courier Miami Venezuela, envios USA Latinoamerica, cargo Colombia, freight forwarder latam',
  openGraph: {
    title: 'Envia Latam — Couriers confiables a toda Latinoamérica',
    description: 'Encuentra el mejor courier para enviar tus paquetes desde USA a Latinoamérica.',
    type: 'website',
  },
};

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';
const clerkConfigured = clerkKey.startsWith('pk_') && !clerkKey.includes('REPLACE_ME');

async function LayoutContent({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const isPortal = headersList.get('x-is-portal') === '1';

  return (
    <html lang="es" className={inter.variable}>
      <body>
        {!isPortal && <Nav />}
        <main>{children}</main>
        {!isPortal && <Footer />}
      </body>
    </html>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  if (clerkConfigured) {
    const { ClerkProvider } = await import('@clerk/nextjs');
    return (
      <ClerkProvider>
        <LayoutContent>{children}</LayoutContent>
      </ClerkProvider>
    );
  }

  return <LayoutContent>{children}</LayoutContent>;
}
