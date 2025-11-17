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
        className="flex items-center justify-between w-full text-left text-neutral-50 hover:text-shrimp-400 transition-colors duration-200"
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
    <footer
      className={cn(
        'relative w-full bg-gradient-to-b from-sunshine-200 to-navy-800 text-neutral-50',
        className
      )}
    >
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-navy-900/60 mix-blend-multiply" />

      <div className="relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
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
                  <h3 className="text-2xl font-bold font-poppins text-neutral-50">
                    CIREBON SATU DATA
                  </h3>
                  <p className="text-neutral-200 text-sm font-lato">
                    Portal Resmi Pemerintah Kota Cirebon
                  </p>
                </div>
              </div>

              <p className="text-neutral-200 text-sm leading-relaxed font-lato max-w-lg">
                Portal resmi Pemerintah Kota Cirebon yang menyediakan akses
                terbuka terhadap data publik, informasi layanan pemerintah, dan
                berbagai program inovatif untuk kemajuan Kota Cirebon.
              </p>

              {/* Social Media Editable*/}
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/pemdakotacrb/"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-neutral-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@pemkotcirebon"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-neutral-50" />
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-neutral-50 font-poppins mb-6">
                Produk &amp; Layanan
              </h4>

              <div className="space-y-4">
                <ProductToggle
                  isOpen={openDataOpen}
                  onToggle={() => setOpenDataOpen(!openDataOpen)}
                  title="Open Data"
                >
                  <div className="space-y-2 text-sm text-neutral-200">
                    <Link
                      href="https://opendata.cirebonkota.go.id/dataset"
                      className="block hover:text-data-300"
                      target="_blank"
                    >
                      • Dataset
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/publikasi"
                      className="block hover:text-data-300"
                      target="_blank"
                    >
                      • Publikasi
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/infografik"
                      className="block hover:text-data-300"
                      target="_blank"
                    >
                      • Infografik
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/visualisasi"
                      className="block hover:text-data-300"
                      target="_blank"
                    >
                      • Visualisasi
                    </Link>
                    <Link
                      href="https://opendata.cirebonkota.go.id/artikel"
                      className="block hover:text-data-300"
                      target="_blank"
                    >
                      • Artikel
                    </Link>
                  </div>
                </ProductToggle>

                <Link
                  href="https://satudata.cirebonkota.go.id"
                  className="block text-neutral-50 hover:text-shrimp-400 font-semibold text-lg transition-colors"
                  target="_blank"
                >
                  Satu Data
                </Link>

                <Link
                  href="https://satupeta.cirebonkota.go.id"
                  className="block text-neutral-50 hover:text-shrimp-400 font-semibold text-lg transition-colors"
                  target="_blank"
                >
                  Satu Peta
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-neutral-300 text-sm font-lato text-center lg:text-left">
                © 2025 Pemerintah Kota Cirebon. Semua hak dilindungi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
