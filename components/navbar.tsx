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
  const [activeSection, setActiveSection] = React.useState<string>('');

  // Smooth scroll handler for navigation links
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80; // Account for fixed header height
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Fallback scroll-based section detection
      const openDataSection = document.getElementById('open-data');
      const satuDataSection = document.getElementById('satu-data');
      const satuPetaSection = document.getElementById('satu-peta');

      // If we're at the very top (hero section), clear active section
      if (window.scrollY < 50) {
        setActiveSection('');
        return;
      }

      if (openDataSection && satuDataSection && satuPetaSection) {
        const openDataRect = openDataSection.getBoundingClientRect();
        const satuDataRect = satuDataSection.getBoundingClientRect();
        const satuPetaRect = satuPetaSection.getBoundingClientRect();

        // Check which section is more visible - only activate if section is significantly in view
        const openDataVisible =
          openDataRect.top < window.innerHeight * 0.3 &&
          openDataRect.bottom > window.innerHeight * 0.3;
        const satuDataVisible =
          satuDataRect.top < window.innerHeight * 0.3 &&
          satuDataRect.bottom > window.innerHeight * 0.3;
        const satuPetaVisible =
          satuPetaRect.top < window.innerHeight * 0.3 &&
          satuPetaRect.bottom > window.innerHeight * 0.3;

        if (satuPetaVisible) {
          setActiveSection('satu-peta');
        } else if (satuDataVisible) {
          setActiveSection('satu-data');
        } else if (openDataVisible) {
          setActiveSection('open-data');
        } else {
          // If no section is significantly visible, clear active section
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let hasIntersectingSection = false;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          console.log('Active section:', sectionId); // Debug log
          setActiveSection(sectionId);
          hasIntersectingSection = true;
        }
      });

      // If no section is intersecting and we're near the top, clear active section
      if (!hasIntersectingSection && window.scrollY < 100) {
        setActiveSection('');
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Use MutationObserver to watch for when sections are added
    const mutationObserver = new MutationObserver(() => {
      const openDataSection = document.getElementById('open-data');
      const satuDataSection = document.getElementById('satu-data');
      const satuPetaSection = document.getElementById('satu-peta');

      if (openDataSection && !openDataSection.hasAttribute('data-observed')) {
        observer.observe(openDataSection);
        openDataSection.setAttribute('data-observed', 'true');
        console.log('Open Data section observed');
      }

      if (satuDataSection && !satuDataSection.hasAttribute('data-observed')) {
        observer.observe(satuDataSection);
        satuDataSection.setAttribute('data-observed', 'true');
        console.log('Satu Data section observed');
      }

      if (satuPetaSection && !satuPetaSection.hasAttribute('data-observed')) {
        observer.observe(satuPetaSection);
        satuPetaSection.setAttribute('data-observed', 'true');
        console.log('Satu Peta section observed');
      }
    });

    // Start observing the document body for changes
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also try immediately
    const openDataSection = document.getElementById('open-data');
    const satuDataSection = document.getElementById('satu-data');
    const satuPetaSection = document.getElementById('satu-peta');

    if (openDataSection) {
      observer.observe(openDataSection);
      openDataSection.setAttribute('data-observed', 'true');
    }
    if (satuDataSection) {
      observer.observe(satuDataSection);
      satuDataSection.setAttribute('data-observed', 'true');
    }
    if (satuPetaSection) {
      observer.observe(satuPetaSection);
      satuPetaSection.setAttribute('data-observed', 'true');
    }

    return () => {
      mutationObserver.disconnect();
      const openDataSection = document.getElementById('open-data');
      const satuDataSection = document.getElementById('satu-data');
      const satuPetaSection = document.getElementById('satu-peta');
      if (openDataSection) observer.unobserve(openDataSection);
      if (satuDataSection) observer.unobserve(satuDataSection);
      if (satuPetaSection) observer.unobserve(satuPetaSection);
    };
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
              onClick={e => handleSmoothScroll(e, 'open-data')}
              className={cn(
                'flex items-center space-x-2 transition-colors duration-200 font-lato text-sm uppercase tracking-wide',
                activeSection === 'open-data'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              )}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 40 40"
                className="cursor-pointer transition-colors duration-200"
              >
                <rect
                  x="4"
                  y="4"
                  width="32"
                  height="32"
                  rx="8"
                  fill={activeSection === 'open-data' ? '#1976D2' : '#9ca3af'}
                  stroke={activeSection === 'open-data' ? '#1d4ed8' : '#6b7280'}
                  strokeWidth="2"
                  className="transition-colors duration-200"
                />
                <rect
                  x="12"
                  y="12"
                  width="16"
                  height="16"
                  rx="4"
                  fill={activeSection === 'open-data' ? '#ffffff' : '#e5e7eb'}
                  className="transition-colors duration-200"
                />
              </svg>

              <span className="mt-1">Open Data</span>
            </Link>
            <Link
              href="#satu-data"
              onClick={e => handleSmoothScroll(e, 'satu-data')}
              className={cn(
                'flex items-center space-x-2 transition-colors duration-200 font-lato text-sm uppercase tracking-wide',
                activeSection === 'satu-data'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              )}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 40 40"
                className="cursor-pointer transition-colors duration-200"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill={activeSection === 'satu-data' ? '#1976D2' : '#9ca3af'}
                  stroke={activeSection === 'satu-data' ? '#1d4ed8' : '#6b7280'}
                  strokeWidth="2"
                  className="transition-colors duration-200"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="8"
                  fill={activeSection === 'satu-data' ? '#ffffff' : '#e5e7eb'}
                  className="transition-colors duration-200"
                />
              </svg>
              <span className="mt-1">Satu Data</span>
            </Link>
            <Link
              href="#satu-peta"
              onClick={e => handleSmoothScroll(e, 'satu-peta')}
              className={cn(
                'flex items-center space-x-2 transition-colors duration-200 font-lato text-sm uppercase tracking-wide',
                activeSection === 'satu-peta'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              )}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 40 40"
                className="cursor-pointer transition-colors duration-200"
              >
                <path
                  d="M20 4L4 20h16v16h16V20h16L20 4z"
                  fill={activeSection === 'satu-peta' ? '#1976D2' : '#9ca3af'}
                  stroke={activeSection === 'satu-peta' ? '#1d4ed8' : '#6b7280'}
                  strokeWidth="2"
                  className="transition-colors duration-200"
                />
                <path
                  d="M20 12L12 20h8v8h8V20h8L20 12z"
                  fill={activeSection === 'satu-peta' ? '#ffffff' : '#e5e7eb'}
                  className="transition-colors duration-200"
                />
              </svg>
              <span className="mt-1">Satu Peta</span>
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
                  onClick={e => {
                    handleSmoothScroll(e, 'open-data');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors duration-200 font-lato text-sm uppercase tracking-wide',
                    activeSection === 'open-data'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  )}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 40 40"
                    className="cursor-pointer transition-colors duration-200"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="32"
                      height="32"
                      rx="8"
                      fill={
                        activeSection === 'open-data' ? '#1976D2' : '#9ca3af'
                      }
                      stroke={
                        activeSection === 'open-data' ? '#1d4ed8' : '#6b7280'
                      }
                      strokeWidth="2"
                      className="transition-colors duration-200"
                    />
                    <rect
                      x="12"
                      y="12"
                      width="16"
                      height="16"
                      rx="4"
                      fill={
                        activeSection === 'open-data' ? '#ffffff' : '#e5e7eb'
                      }
                      className="transition-colors duration-200"
                    />
                  </svg>
                  <span>Open Data</span>
                </Link>
                <Link
                  href="#satu-data"
                  onClick={e => {
                    handleSmoothScroll(e, 'satu-data');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors duration-200 font-lato text-sm uppercase tracking-wide',
                    activeSection === 'satu-data'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  )}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 40 40"
                    className="cursor-pointer transition-colors duration-200"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      fill={
                        activeSection === 'satu-data' ? '#1976D2' : '#9ca3af'
                      }
                      stroke={
                        activeSection === 'satu-data' ? '#1d4ed8' : '#6b7280'
                      }
                      strokeWidth="2"
                      className="transition-colors duration-200"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="8"
                      fill={
                        activeSection === 'satu-data' ? '#ffffff' : '#e5e7eb'
                      }
                      className="transition-colors duration-200"
                    />
                  </svg>
                  <span>Satu Data</span>
                </Link>
                <Link
                  href="#satu-peta"
                  onClick={e => {
                    handleSmoothScroll(e, 'satu-peta');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors duration-200 font-lato text-sm uppercase tracking-wide',
                    activeSection === 'satu-peta'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  )}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 40 40"
                    className="cursor-pointer transition-colors duration-200"
                  >
                    <path
                      d="M20 4L4 20h16v16h16V20h16L20 4z"
                      fill={
                        activeSection === 'satu-peta' ? '#1976D2' : '#9ca3af'
                      }
                      stroke={
                        activeSection === 'satu-peta' ? '#1d4ed8' : '#6b7280'
                      }
                      strokeWidth="2"
                      className="transition-colors duration-200"
                    />
                    <path
                      d="M20 12L12 20h8v8h8V20h8L20 12z"
                      fill={
                        activeSection === 'satu-peta' ? '#ffffff' : '#e5e7eb'
                      }
                      className="transition-colors duration-200"
                    />
                  </svg>
                  <span>Satu Peta</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
