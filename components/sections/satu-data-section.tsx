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
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function SatuDataSection() {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<string | undefined>(
    undefined
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateHeight = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && imagesContainerRef.current) {
        const height = imagesContainerRef.current.scrollHeight;
        setSectionHeight(`${height}px`);
      } else {
        setSectionHeight(undefined);
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
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>

      <MotionSection
        id="satu-data"
        className="relative min-h-screen bg-gradient-to-br from-data-50 via-neutral-50 to-data-100 text-navy-700 lg:h-auto"
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
          <div className="absolute top-40 -right-20 w-80 h-80 bg-data-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 -left-32 w-96 h-96 bg-shrimp-300/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-data-200/25 rounded-full blur-2xl animate-pulse delay-300" />

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Geometric Shapes */}
          <div className="absolute top-1/4 left-20 w-24 h-24 border-2 border-data-300/20 rounded-lg rotate-12 animate-float-slow" />
          <div className="absolute bottom-1/3 right-32 w-16 h-16 border border-shrimp-300/30 rounded-full animate-float-slow delay-300" />
          <div className="absolute top-2/3 left-1/3 w-20 h-20 bg-gradient-to-br from-data-200/10 to-transparent rounded-lg -rotate-6 animate-float-slow delay-700" />
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
                    text="Satu Data Kota Cirebon"
                    className="text-4xl sm:text-5xl font-bold font-lora text-navy-700 leading-tight"
                    delay={0.2}
                  />
                  <MotionP
                    className="text-base sm:text-lg font-inter leading-relaxed text-neutral-800/90"
                    variants={fadeInUpVariants}
                    transition={{ delay: 0.4 }}
                  >
                    Portal pengelolaan data bagi Produsen Data Cirebon Satu
                    Data. Melalui portal ini, produsen data dapat saling berbagi
                    dan memanfaatkan data yang akurat, terstandar, serta mudah
                    diakses untuk mendukung perumusan kebijakan yang lebih
                    terukur di lingkungan Pemerintah Kota Cirebon.
                  </MotionP>
                </div>

                {/* Feature Highlights */}
                <MotionDiv
                  className="py-4 px-2"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-white/80 via-data-50/50 to-shrimp-50/30 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-data-300/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-shrimp-300/20 rounded-full blur-2xl" />

                    <div className="relative space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 bg-data-500/10 rounded-lg">
                          <svg
                            className="w-5 h-5 text-data-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-navy-700 text-sm">
                            Data Terstandar
                          </h3>
                          <p className="text-xs text-neutral-700 mt-1">
                            Integrasi dan standarisasi data berkualitas
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    className="sm:w-[350px] group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-shrimp-400 to-shrimp-500 hover:from-shrimp-500 hover:to-shrimp-600 text-white font-semibold rounded-xl shadow-[0_8px_24px_rgba(244,114,82,0.25)] hover:shadow-[0_12px_32px_rgba(244,114,82,0.35)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    <span className="text-base sm:text-lg">
                      Kunjungi Portal Satu Data
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

                {/* Image Section - Enhanced */}
                <MotionDiv
                  className="pb-4 px-1 text-center flex justify-center overflow-hidden"
                  variants={scaleInVariants}
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative group w-full sm:w-auto max-h-[300px] h-auto overflow-hidden">
                    {/* Decorative background - contained within bounds */}
                    <div className="absolute inset-0 bg-gradient-to-r from-data-300/30 to-shrimp-300/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image container */}
                    <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] h-full flex items-center justify-center">
                      <div className="overflow-hidden rounded-xl w-full h-full max-h-[260px]">
                        <Image
                          src="/beranda-satudata-1.png"
                          alt="Satu Data Portal Cirebon"
                          width={800}
                          height={600}
                          className="w-full h-full max-h-[260px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Corner decoration - positioned within bounds */}
                    <div className="absolute top-1 right-1 w-16 h-16 border-4 border-data-400/40 rounded-2xl rotate-12" />
                    <div className="absolute bottom-1 left-1 w-12 h-12 bg-shrimp-400/20 rounded-full blur-md" />
                  </div>
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
                  text="Satu Data Kota Cirebon"
                  className="text-5xl font-bold font-lora text-navy-700"
                  delay={0.2}
                />
                <MotionP
                  className="text-lg font-inter leading-relaxed text-neutral-700"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.4 }}
                >
                  Portal Satu Data adalah platform terpadu untuk memperkuat tata
                  kelola data. Kami memastikan integrasi dan standarisasi data,
                  sehingga menghasilkan data yang berkualitas, andal, dan siap
                  digunakan untuk analisis yang akurat.
                </MotionP>

                <MotionDiv
                  className="mt-8"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="https://satudata.cirebonkota.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-shrimp-400 hover:bg-shrimp-500 text-neutral-50 font-semibold rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Kunjungi Portal Satu Data</span>
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
                  src="/beranda-satudata-1.png"
                  alt="Satu Data Portal"
                  width={1200}
                  height={800}
                  className="w-full h-full"
                />
              </MotionDiv>

              <MotionDiv
                className="rounded-xl overflow-hidden h-[500px]"
                variants={scaleInVariants}
              >
                <Image
                  src="/satudata-12.png"
                  alt="Data Visualization"
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain"
                />
              </MotionDiv>

              <MotionDiv
                className="rounded-xl overflow-hidden h-[500px]"
                variants={scaleInVariants}
              >
                <Image
                  src="/satudat-3.png"
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
