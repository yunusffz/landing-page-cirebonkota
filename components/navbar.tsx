'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
        isScrolled ? 'drop-shadow' : '',
        className
      )}
    >
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/logo.png"
                alt="Cirebon Kota Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-700 mt-1 font-poppins">
                EKOSISTEM DATA KOTA CIREBON
              </span>
            </div>
          </Link>

          {/* Desktop Options */}
          <div className="hidden lg:flex items-center space-x-8 font-extrabold">
            <Link
              href="#open-data"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-lato text-sm uppercase tracking-wide"
            >
              <Image
                src="/logo-gray.png"
                alt="Open Data"
                width={40}
                height={40}
              />
              <span className="mt-1">Open Data</span>
            </Link>
            <Link
              href="#satu-data"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-lato text-sm uppercase tracking-wide"
            >
              <Image
                src="/logo-gray.png"
                alt="Open Data"
                width={40}
                height={40}
              />
              <span className="mt-1">Satu Data</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1  backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200/50">
              <div className="pt-4 pb-2 space-y-3">
                <Link
                  href="#open-data"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 font-lato text-sm uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/logo-gray.png"
                    alt="Open Data"
                    width={40}
                    height={40}
                  />
                  <span>Open Data</span>
                </Link>
                <Link
                  href="#satu-data"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 font-lato text-sm uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/logo-gray.png"
                    alt="Open Data"
                    width={40}
                    height={40}
                  />
                  <span>Satu Data</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
