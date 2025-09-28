'use client';

import { cn } from '@/lib/utils';
import { Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface FooterProps {
  className?: string;
}

interface ProductToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  children: React.ReactNode;
}

function ProductToggle({
  isOpen,
  onToggle,
  title,
  children,
}: ProductToggleProps) {
  return (
    <div className="space-y-2">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left text-gray-900 hover:text-gray-600 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg">{title}</span>
        <svg
          className={cn(
            'w-5 h-5 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pt-2 space-y-2">{children}</div>
      </div>
    </div>
  );
}

export function Footer({ className }: FooterProps) {
  const [openDataOpen, setOpenDataOpen] = React.useState(false);

  return (
    <footer className={cn('relative w-full', className)}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer.png"
          alt="Footer Background"
          fill
          className="object-cover object-top"
          style={{ objectPosition: 'center -320px' }}
          priority
        />
        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Logo and Description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src="/logo.png"
                    alt="Cirebon Kota Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                    EKOSISTEM DATA KOTA CIREBON
                  </h3>
                  <p className="text-gray-600 text-sm font-lato">
                    Portal Resmi Pemerintah Kota Cirebon
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-lato">
                Portal resmi Pemerintah Kota Cirebon yang menyediakan akses
                terbuka terhadap data publik, informasi layanan pemerintah, dan
                berbagai program inovatif untuk kemajuan Kota Cirebon.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/pemdakotacrb/"
                  className="w-10 h-10 bg-gray-900/10 rounded-full flex items-center justify-center hover:bg-gray-900/20 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@pemkotcirebon"
                  className="w-10 h-10 bg-gray-900/10 rounded-full flex items-center justify-center hover:bg-gray-900/20 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-gray-900" />
                </a>
              </div>
            </div>

            {/* Right Column - Product Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 font-poppins mb-6">
                Produk & Layanan
              </h4>

              <div className="space-y-4">
                {/* Open Data Toggle */}
                <ProductToggle
                  isOpen={openDataOpen}
                  onToggle={() => setOpenDataOpen(!openDataOpen)}
                  title="Open Data"
                >
                  <div className="space-y-2 text-sm text-gray-600">
                    <Link
                      href="https://opendata.cirebonkota.go.id/dataset"
                      className="block hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      • Dataset
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/publikasi"
                      className="block hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      • Publikasi
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/infografik"
                      className="block hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      • Infografik
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/visualisasi"
                      className="block hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      • Visualisasi
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/artikel"
                      className="block hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      • Artikel
                    </Link>
                  </div>
                </ProductToggle>

                {/* Satu Data Link */}
                <Link
                  href="https://satudata.cirebonkota.go.id"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-200 font-semibold text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Satu Data
                </Link>

                {/* Satu Peta Link */}
                <Link
                  href="https://satupeta.cirebonkota.go.id"
                  className="block text-gray-900 hover:text-gray-600 transition-colors duration-200 font-semibold text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Satu Peta
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-900/20">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-gray-500 text-sm font-lato">
                  © 2025 Pemerintah Kota Cirebon. Semua hak dilindungi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
