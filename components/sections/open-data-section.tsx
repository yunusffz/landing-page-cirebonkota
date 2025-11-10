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
import { useArticles } from '@/queries/article/use-article-query';
import { useDatasets } from '@/queries/datasets/use-datasets-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function OpenDataSection() {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState('1827px');
  const { data: datasetsData, isLoading: datasetsLoading } = useDatasets();
  const { data: articlesData, isLoading: articlesLoading } = useArticles();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-custom {
          background: white;
          transform: scale(1.2);
        }
        .swiper-pagination {
          position: relative;
          margin-top: 1rem;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>

      <MotionSection
        id="open-data"
        className="relative min-h-screen bg-gradient-to-br from-data-700 via-data-800 to-data-900"
        style={{ height: sectionHeight }}
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
          <div className="absolute top-20 -left-40 w-96 h-96 bg-shrimp-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] bg-data-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sunshine-400/10 rounded-full blur-2xl animate-pulse delay-500" />

          {/* Dot Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Geometric Shapes */}
          <div className="absolute top-40 right-20 w-32 h-32 border border-neutral-50/10 rounded-lg rotate-45 animate-spin-slow" />
          <div className="absolute bottom-60 left-40 w-20 h-20 border-2 border-shrimp-400/20 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-neutral-50/5 to-transparent rounded-lg rotate-12" />
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
                    text="Open Data Kota Cirebon"
                    className="text-4xl sm:text-5xl font-bold text-neutral-50 font-lora leading-tight"
                    delay={0.2}
                  />
                  <MotionP
                    className="text-base sm:text-lg text-neutral-100/90 font-inter leading-relaxed"
                    variants={fadeInUpVariants}
                    transition={{ delay: 0.4 }}
                  >
                    Portal data terbuka yang menghadirkan berbagai informasi
                    publik Pemerintah Kota Cirebon secara mudah diakses,
                    transparan, dan dapat dimanfaatkan oleh siapa saja. Dengan
                    prinsip keterbukaan informasi, Open Data mendorong partisipasi
                    masyarakat, mendukung penelitian, serta membuka peluang
                    inovasi dan kolaborasi berbasis data.
                  </MotionP>
                </div>

                {/* Dataset and Article Count Display - Enhanced */}
                <MotionDiv
                  className="py-4"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.5 }}
                >
                  {datasetsLoading || articlesLoading ? (
                    <div className="text-neutral-200 text-sm bg-white/5 rounded-xl p-6 border border-neutral-100/10">
                      Memuat data...
                    </div>
                  ) : datasetsData || articlesData ? (
                    <div className="grid grid-cols-2 gap-4">
                      {datasetsData && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                          {/* Decorative Elements */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-shrimp-400/20 rounded-full blur-xl" />

                          <div className="relative text-center space-y-2">
                            <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-shrimp-200 bg-clip-text text-transparent">
                              {datasetsData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-neutral-200 tracking-wide uppercase">
                              Dataset
                            </div>
                          </div>
                        </div>
                      )}
                      {articlesData && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                          {/* Decorative Elements */}
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-sunshine-400/20 rounded-full blur-xl" />

                          <div className="relative text-center space-y-2">
                            <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-sunshine-200 bg-clip-text text-transparent">
                              {articlesData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-neutral-200 tracking-wide uppercase">
                              Artikel
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </MotionDiv>

                {/* CTA Button */}
                <MotionDiv
                  className="py-2"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="https://opendata.cirebonkota.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-neutral-50 to-neutral-100 text-data-800 hover:from-shrimp-400 hover:to-shrimp-500 hover:text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(244,114,82,0.4)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    <span className="text-base sm:text-lg">Kunjungi Portal Open Data</span>
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
                  className="pt-8 pb-4 px-1"
                  variants={scaleInVariants}
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative group px-6 py-6">
                    {/* Decorative background */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-shrimp-400/30 to-sunshine-400/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image container */}
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                      <div className="overflow-hidden rounded-xl">
                        <Image
                          src="/beranda-opendata.png"
                          alt="Open Data Portal Cirebon"
                          width={800}
                          height={400}
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute -top-2 -right-2 w-20 h-20 border-4 border-shrimp-400/40 rounded-2xl rotate-12" />
                    <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-sunshine-400/30 rounded-full blur-md" />
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
                  text="Open Data Kota Cirebon"
                  className="text-5xl font-bold text-neutral-50 font-lora leading-16"
                  delay={0.2}
                />
                <MotionP
                  className="text-lg text-neutral-100 font-inter leading-relaxed"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.4 }}
                >
                  Cirebon Satu Data merupakan portal data terbuka dan informasi
                  publik bagi warga Kota Cirebon. Melalui portal ini, siapa pun
                  dapat menjelajahi dan mengunduh berbagai data terbuka dari
                  Organisasi Perangkat Daerah serta instansi lainnya di Kota
                  Cirebon.
                </MotionP>

                {/* Stats */}
                <MotionDiv
                  className="mt-6"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  {datasetsLoading || articlesLoading ? (
                    <div className="text-neutral-200 text-sm">
                      Memuat data...
                    </div>
                  ) : datasetsData || articlesData ? (
                    <div className="grid grid-cols-2 gap-4">
                      {datasetsData && (
                        <MotionDiv
                          className="bg-neutral-50/10 backdrop-blur-sm rounded-lg p-4 border border-neutral-100/20"
                          variants={scaleInVariants}
                          transition={{ delay: 0.8 }}
                        >
                          <div className="text-center">
                            <div className="text-3xl font-bold text-neutral-50 mb-2">
                              {datasetsData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-neutral-100">
                              Dataset
                            </div>
                          </div>
                        </MotionDiv>
                      )}
                      {articlesData && (
                        <MotionDiv
                          className="bg-neutral-50/10 backdrop-blur-sm rounded-lg p-4 border border-neutral-100/20"
                          variants={scaleInVariants}
                          transition={{ delay: 1.0 }}
                        >
                          <div className="text-center">
                            <div className="text-3xl font-bold text-neutral-50 mb-2">
                              {articlesData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-neutral-100">
                              Artikel
                            </div>
                          </div>
                        </MotionDiv>
                      )}
                    </div>
                  ) : null}
                </MotionDiv>

                {/* CTA Button */}
                <MotionDiv
                  className="mt-8"
                  variants={fadeInUpVariants}
                  transition={{ delay: 1.2 }}
                >
                  <a
                    href="https://opendata.cirebonkota.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-neutral-50 text-data-700 hover:bg-shrimp-400 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-200"
                  >
                    <span>Kunjungi Portal Open Data</span>
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

            {/* Right images */}
            <MotionDiv
              ref={imagesContainerRef}
              className="space-y-40 flex flex-col pt-[calc(50vh-200px-40px)] pb-[calc(50vh-250px)]"
              variants={fadeInRightVariants}
              transition={{ delay: 0.8 }}
            >
              <MotionDiv
                className="rounded-2xl overflow-hidden h-[400px]"
                variants={scaleInVariants}
              >
                <Image
                  src="/beranda-opendata.png"
                  alt="Open Data Portal Cirebon"
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
                  src="/opendat-1.png"
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
                  src="/opendat-2.png"
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
