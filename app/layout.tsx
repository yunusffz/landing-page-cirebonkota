import { Navbar } from '@/components/navbar';
import { Inter, Lato } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata = {
  title: 'Cirebon Kota - Pemerintah Kota Cirebon',
  description: 'Portal resmi Pemerintah Kota Cirebon. Informasi layanan publik, berita, dan program pemerintah.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body 
        className="min-h-screen bg-gray-50"
        style={{
          '--font-inter': inter.style.fontFamily,
          '--font-lato': lato.style.fontFamily,
        } as React.CSSProperties}
      >
        <Navbar />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
