import { Navbar } from '@/components/navbar';
import { Inter, Lato, Poppins, Lora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

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
          '--font-poppins': poppins.style.fontFamily,
          '--font-lora': lora.style.fontFamily,
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
