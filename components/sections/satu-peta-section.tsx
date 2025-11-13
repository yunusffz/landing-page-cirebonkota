'use client';
import {
  AnimatedText,
  MotionDiv,
  MotionP,
  MotionSection,
  fadeInLeftVariants,
  fadeInRightVariants,
  fadeInUpVariants,
  scaleInVariants,
  staggerContainerVariants,
} from '@/components/ui/motion';
import { useMapsets } from '@/queries/mapsets/use-mapsets-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function SatuPetaSection() {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<string | undefined>(
    undefined
  );
  const [isMounted, setIsMounted] = useState(false);
  const {
    data: mapsetsData,
    isLoading: mapsetsLoading,
    error: mapsetsError,
  } = useMapsets();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateHeight = () => {
      if (imagesContainerRef.current) {
        const height = imagesContainerRef.current.scrollHeight;
        setSectionHeight(`${height}px`);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    const images = imagesContainerRef.current?.querySelectorAll('img');
    if (images)
      images.forEach(img => img.addEventListener('load', updateHeight));
    return () => {
      window.removeEventListener('resize', updateHeight);
      if (images)
        images.forEach(img => img.removeEventListener('load', updateHeight));
    };
  }, [isMounted]);

  return (
    <>
      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 12s ease-in-out infinite;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-800 {
          animation-delay: 800ms;
        }
      `}</style>

      <MotionSection
        id="satu-peta"
        className="relative min-h-screen bg-gradient-to-br from-sunshine-100 via-sunshine-50 to-shrimp-100 text-navy-700 lg:h-auto"
        style={
          isMounted && sectionHeight ? { height: sectionHeight } : undefined
        }
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainerVariants}
      >
        {/* Decorative Background Elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: 'hidden' }}
        >
          {/* Animated Gradient Orbs */}
          <div className="absolute top-32 -left-24 w-96 h-96 bg-sunshine-300/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 -right-24 w-[450px] h-[450px] bg-shrimp-300/30 rounded-full blur-3xl animate-pulse delay-800" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-sunshine-200/35 rounded-full blur-2xl animate-pulse delay-400" />

          {/* Diagonal Lines Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)',
            }}
          />

          {/* Geometric Shapes */}
          <div className="absolute top-1/5 right-24 w-28 h-28 border-2 border-sunshine-400/25 rounded-lg -rotate-12 animate-bounce-slow" />
          <div className="absolute bottom-1/4 left-28 w-20 h-20 border-2 border-shrimp-400/20 rounded-full animate-bounce-slow delay-400" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-linear-to-br from-sunshine-300/15 to-transparent rounded-lg rotate-45 animate-bounce-slow delay-800" />
          <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border border-data-300/20 rounded-lg rotate-6" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
          {/* Mobile layout */}
          <div className="lg:hidden">
            <MotionDiv
              className="flex flex-col py-12 min-h-screen"
              variants={fadeInLeftVariants}
            >
              <div className="space-y-8 px-1">
                {/* Title Section */}
                <div className="space-y-6 pt-8">
                  <AnimatedText
                    text="Satu Peta Kota Cirebon"
                    className="text-4xl sm:text-5xl font-bold font-lora text-navy-700 leading-tight"
                    delay={0.2}
                  />
                  <MotionP
                    className="text-base sm:text-lg font-inter leading-relaxed text-neutral-800/90"
                    variants={fadeInUpVariants}
                    transition={{ delay: 0.4 }}
                  >
                    Portal data geospasial terpadu yang menyajikan informasi
                    spasial Kota Cirebon secara akurat dan mudah diakses.
                    Melalui portal ini, perangkat daerah dan masyarakat dapat
                    menjelajahi, mengelola, serta berbagi data geospasial untuk
                    mendukung perencanaan dan pengambilan kebijakan yang lebih
                    terarah.
                  </MotionP>
                </div>

                {/* Mapset Count - Infographic Style */}
                <MotionDiv
                  className="py-4 px-2"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.5 }}
                >
                  {mapsetsLoading ? (
                    <div className="text-neutral-600 text-sm bg-white/60 rounded-xl p-6 border border-neutral-200">
                      Memuat data...
                    </div>
                  ) : mapsetsError ? (
                    <div className="text-red-500 text-sm bg-red-50/60 rounded-xl p-6 border border-red-200">
                      Error: {mapsetsError.message}
                    </div>
                  ) : mapsetsData ? (
                    <div className="relative overflow-hidden bg-gradient-to-br from-white/80 via-sunshine-50/50 to-shrimp-50/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] group hover:scale-[1.02] transition-transform duration-300">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sunshine-300/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-shrimp-300/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                      <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-20 h-20 border-4 border-sunshine-400/20 rounded-full" />

                      <div className="relative space-y-3">
                        {/* Icon */}
                        <div className="flex justify-center">
                          <div className="p-3 bg-shrimp-400/20 rounded-2xl backdrop-blur-sm border border-sunshine-300/30">
                            <svg
                              className="w-8 h-8 sm:w-10 sm:h-10 text-shrimp-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Number */}
                        <div className="text-center">
                          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-navy-700 via-navy-600 to-shrimp-600 bg-clip-text text-transparent leading-tight">
                            {mapsetsData.data.count.toLocaleString('id-ID')}
                          </div>
                        </div>

                        {/* Label */}
                        <div className="text-center space-y-1">
                          <div className="text-sm sm:text-base font-semibold text-navy-700 tracking-wide uppercase">
                            Mapset
                          </div>
                          <div className="text-xs text-neutral-700/80">
                            Data Geospasial Terpadu
                          </div>
                        </div>

                        {/* Decorative Line */}
                        <div className="flex justify-center pt-2">
                          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-shrimp-400/50 to-transparent rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-neutral-600 text-sm bg-white/60 rounded-xl p-6 border border-neutral-200">
                      Tidak ada data tersedia
                    </div>
                  )}
                </MotionDiv>

                {/* CTA Button */}
                <MotionDiv
                  className="py-2"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="https://satudata.cirebonkota.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-shrimp-400 to-shrimp-500 hover:from-shrimp-500 hover:to-shrimp-600 text-white font-semibold rounded-xl shadow-[0_8px_24px_rgba(244,114,82,0.25)] hover:shadow-[0_12px_32px_rgba(244,114,82,0.35)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    <span className="text-base sm:text-lg">
                      Kunjungi Portal Satu Peta
                    </span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </MotionDiv>
              </div>
            </MotionDiv>
          </div>

          {/* Desktop layout */}
          <div className="lg:grid-cols-2 gap-8 lg:gap-12 h-full hidden lg:grid">
            <MotionDiv
              className="sticky top-20 flex flex-col justify-center h-[calc(100vh-80px)]"
              variants={fadeInLeftVariants}
            >
              <div className="space-y-6">
                <AnimatedText
                  text="Satu Peta Kota Cirebon"
                  className="text-5xl font-bold font-lora text-navy-700"
                  delay={0.2}
                />
                <MotionP
                  className="text-lg font-inter leading-relaxed text-neutral-800"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.4 }}
                >
                  Portal data geospasial terpadu yang menyajikan informasi
                  spasial Kota Cirebon secara akurat dan mudah diakses. Melalui
                  portal ini, perangkat daerah dan masyarakat dapat menjelajahi,
                  mengelola, serta berbagi data geospasial untuk mendukung
                  perencanaan dan pengambilan kebijakan yang lebih terarah.
                </MotionP>

                {/* Mapset Count - Infographic Style */}
                <MotionDiv
                  className="mt-6 px-2"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  {mapsetsLoading ? (
                    <div className="text-neutral-600 text-sm">
                      Memuat data...
                    </div>
                  ) : mapsetsError ? (
                    <div className="text-red-500 text-sm">
                      Error: {mapsetsError.message}
                    </div>
                  ) : mapsetsData ? (
                    <div className="relative overflow-hidden bg-gradient-to-br from-white/80 via-sunshine-50/50 to-shrimp-50/30 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] group hover:scale-[1.02] transition-transform duration-300">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-sunshine-300/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-shrimp-300/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 border-4 border-sunshine-400/20 rounded-full" />

                      <div className="relative space-y-3">
                        {/* Icon */}
                        <div className="flex justify-center">
                          <div className="p-2.5 bg-shrimp-400/20 rounded-xl backdrop-blur-sm border border-sunshine-300/30">
                            <svg
                              className="w-7 h-7 text-shrimp-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Number */}
                        <div className="text-center">
                          <div className="text-4xl font-bold bg-gradient-to-br from-navy-700 via-navy-600 to-shrimp-600 bg-clip-text text-transparent leading-tight">
                            {mapsetsData.data.count.toLocaleString('id-ID')}
                          </div>
                        </div>

                        {/* Label */}
                        <div className="text-center space-y-1">
                          <div className="text-sm font-semibold text-navy-700 tracking-wide uppercase">
                            Mapset
                          </div>
                          <div className="text-xs text-neutral-700/80">
                            Data Geospasial
                          </div>
                        </div>

                        {/* Decorative Line */}
                        <div className="flex justify-center pt-1">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-shrimp-400/50 to-transparent rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-neutral-600 text-sm">
                      Tidak ada data tersedia
                    </div>
                  )}
                </MotionDiv>

                {/* CTA Button */}
                <MotionDiv
                  className="mt-8"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.8 }}
                >
                  <a
                    href="https://satudata.cirebonkota.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-shrimp-400 hover:bg-shrimp-500 text-neutral-50 font-semibold rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Kunjungi Portal Satu Peta</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </MotionDiv>
              </div>
            </MotionDiv>

            {/* Scrolling Images */}
            <MotionDiv
              ref={imagesContainerRef}
              className="space-y-40 flex flex-col pt-[calc(50vh-200px-40px)] pb-[calc(50vh-250px)]"
              variants={fadeInRightVariants}
              transition={{ delay: 0.6 }}
            >
              <MotionDiv
                className="rounded-2xl overflow-hidden h-[400px]"
                variants={scaleInVariants}
              >
                <Image
                  src="/satupeta-0.png"
                  alt="Satu Peta Portal"
                  width={800}
                  height={600}
                  className="w-full h-full"
                />
              </MotionDiv>
              <MotionDiv
                className="rounded-xl overflow-hidden h-[500px]"
                variants={scaleInVariants}
              >
                <Image
                  src="/satupet-1.png"
                  alt="Data Visualization"
                  width={800}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </MotionDiv>
              <MotionDiv
                className="rounded-xl overflow-hidden h-[500px]"
                variants={scaleInVariants}
              >
                <Image
                  src="/satupet-2.png"
                  alt="Data Analysis"
                  width={800}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </MotionDiv>
            </MotionDiv>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
