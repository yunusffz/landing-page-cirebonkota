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
import { useDatasets } from '@/queries/datasets/use-datasets-query';
import { useInfographics } from '@/queries/infographic/use-infographic-query';
import { useVisualizations } from '@/queries/visualization/use-visualization-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function OpenDataSection() {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<string | undefined>(
    undefined
  );
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDirectHash, setIsDirectHash] = useState(false);
  const { data: datasetsData, isLoading: datasetsLoading } = useDatasets();
  const { data: visualizationsData, isLoading: visualizationsLoading } =
    useVisualizations();
  const { data: infographicsData, isLoading: infographicsLoading } =
    useInfographics();

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth >= 1024);

    // Check if user directly accessed this section via hash
    if (window.location.hash === '#open-data') {
      setIsDirectHash(true);
    }

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if data is ready for animation
  const isDataLoaded = !datasetsLoading && !visualizationsLoading && !infographicsLoading;
  const shouldAnimate = isDirectHash && isDataLoaded;

  useEffect(() => {
    if (!isMounted || !isDesktop) return;

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
  }, [isMounted, isDesktop]);

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
        style={
          isMounted && isDesktop && sectionHeight
            ? { height: sectionHeight }
            : undefined
        }
        initial="hidden"
        animate={shouldAnimate ? "visible" : undefined}
        whileInView={!isDirectHash ? "visible" : undefined}
        viewport={!isDirectHash ? { once: true, amount: 0.2 } : undefined}
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
              initial="hidden"
              animate={shouldAnimate ? "visible" : undefined}
              whileInView={!isDirectHash ? "visible" : undefined}
              viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
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
                    prinsip keterbukaan informasi, Open Data mendorong
                    partisipasi masyarakat, mendukung penelitian, serta membuka
                    peluang inovasi dan kolaborasi berbasis data.
                  </MotionP>
                </div>

                {/* Dataset, Visualization, and Infographic Count Display - Infographic Style */}
                <MotionDiv
                  className="py-4"
                  initial="hidden"
                  animate={shouldAnimate ? "visible" : undefined}
                  whileInView={!isDirectHash ? "visible" : undefined}
                  viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.5 }}
                >
                  {datasetsLoading ||
                  visualizationsLoading ||
                  infographicsLoading ? (
                    <div className="text-neutral-200 text-sm bg-white/5 rounded-xl p-6 border border-neutral-100/10">
                      Memuat data...
                    </div>
                  ) : datasetsData || visualizationsData || infographicsData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
                      {datasetsData && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:scale-[1.02] transition-transform duration-300">
                          {/* Decorative Elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-shrimp-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                          <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-24 h-24 border-4 border-white/10 rounded-full" />

                          <div className="relative space-y-3">
                            {/* Icon */}
                            <div className="flex justify-center">
                              <div className="p-3 bg-shrimp-400/20 rounded-2xl backdrop-blur-sm border border-white/20">
                                <svg
                                  className="w-8 h-8 sm:w-10 sm:h-10 text-shrimp-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                                </svg>
                              </div>
                            </div>

                            {/* Number */}
                            <div className="text-center">
                              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-shrimp-200 bg-clip-text text-transparent leading-tight">
                                {datasetsData.data.count.toLocaleString(
                                  'id-ID'
                                )}
                              </div>
                            </div>

                            {/* Label */}
                            <div className="text-center space-y-1">
                              <div className="text-sm sm:text-base font-semibold text-neutral-100 tracking-wide uppercase">
                                Dataset
                              </div>
                              <div className="text-xs text-neutral-300/80">
                                Data Terbuka Tersedia
                              </div>
                            </div>

                            {/* Decorative Line */}
                            <div className="flex justify-center pt-2">
                              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-shrimp-400/50 to-transparent rounded-full" />
                            </div>
                          </div>
                        </div>
                      )}
                      {visualizationsData && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:scale-[1.02] transition-transform duration-300">
                          {/* Decorative Elements */}
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-sunshine-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                          <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-24 h-24 border-4 border-white/10 rounded-full" />

                          <div className="relative space-y-3">
                            {/* Icon */}
                            <div className="flex justify-center">
                              <div className="p-3 bg-sunshine-400/20 rounded-2xl backdrop-blur-sm border border-white/20">
                                <svg
                                  className="w-8 h-8 sm:w-10 sm:h-10 text-sunshine-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                              </div>
                            </div>

                            {/* Number */}
                            <div className="text-center">
                              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-sunshine-200 bg-clip-text text-transparent leading-tight">
                                {visualizationsData.data.count.toLocaleString(
                                  'id-ID'
                                )}
                              </div>
                            </div>

                            {/* Label */}
                            <div className="text-center space-y-1">
                              <div className="text-sm sm:text-base font-semibold text-neutral-100 tracking-wide uppercase">
                                Visualisasi
                              </div>
                              <div className="text-xs text-neutral-300/80">
                                Grafik & Diagram Interaktif
                              </div>
                            </div>

                            {/* Decorative Line */}
                            <div className="flex justify-center pt-2">
                              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-sunshine-400/50 to-transparent rounded-full" />
                            </div>
                          </div>
                        </div>
                      )}
                      {infographicsData && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:scale-[1.02] transition-transform duration-300">
                          {/* Decorative Elements */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-data-400/20 rounded-full blur-3xl group-hover:blur-[100px] transition-all duration-300" />
                          <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-24 h-24 border-4 border-white/10 rounded-full" />
                          <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 border-2 border-white/10 rotate-45" />

                          <div className="relative space-y-3">
                            {/* Icon */}
                            <div className="flex justify-center">
                              <div className="p-3 bg-data-400/20 rounded-2xl backdrop-blur-sm border border-white/20">
                                <svg
                                  className="w-8 h-8 sm:w-10 sm:h-10 text-data-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                              </div>
                            </div>

                            {/* Number */}
                            <div className="text-center">
                              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-data-200 bg-clip-text text-transparent leading-tight">
                                {infographicsData.data.count.toLocaleString(
                                  'id-ID'
                                )}
                              </div>
                            </div>

                            {/* Label */}
                            <div className="text-center space-y-1">
                              <div className="text-sm sm:text-base font-semibold text-neutral-100 tracking-wide uppercase">
                                Infografik
                              </div>
                              <div className="text-xs text-neutral-300/80">
                                Infografik Visual Menarik
                              </div>
                            </div>

                            {/* Decorative Line */}
                            <div className="flex justify-center pt-2">
                              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-data-400/50 to-transparent rounded-full" />
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
                  initial="hidden"
                  animate={shouldAnimate ? "visible" : undefined}
                  whileInView={!isDirectHash ? "visible" : undefined}
                  viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="https://opendata.cirebonkota.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-[350px] group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-neutral-50 to-neutral-100 text-data-800 hover:from-shrimp-400 hover:to-shrimp-500 hover:text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(244,114,82,0.4)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    <span className="text-base sm:text-lg ">
                      Kunjungi Portal Open Data
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
              className="sticky top-20 flex flex-col justify-center h-[calc(100vh-80px)] overflow-y-auto"
              initial="hidden"
              animate={shouldAnimate ? "visible" : undefined}
              whileInView={!isDirectHash ? "visible" : undefined}
              viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
              variants={fadeInLeftVariants}
            >
              <div className="space-y-4 xl:space-y-6">
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

                {/* Stats - Infographic Style */}
                <MotionDiv
                  className="mt-4 xl:mt-6 [@media(min-height:600px)]:block hidden"
                  initial="hidden"
                  animate={shouldAnimate ? "visible" : undefined}
                  whileInView={!isDirectHash ? "visible" : undefined}
                  viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.6 }}
                >
                  {datasetsLoading ||
                  visualizationsLoading ||
                  infographicsLoading ? (
                    <div className="text-neutral-200 text-sm">
                      Memuat data...
                    </div>
                  ) : datasetsData || visualizationsData || infographicsData ? (
                    <div className="p-2">
                      <div className="grid grid-cols-3 gap-3 xl:gap-4">
                        {datasetsData && (
                          <MotionDiv
                            className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 xl:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:scale-[1.02] transition-transform duration-300"
                            initial="hidden"
                            animate={shouldAnimate ? "visible" : undefined}
                            whileInView={!isDirectHash ? "visible" : undefined}
                            viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
                            variants={scaleInVariants}
                            transition={{ delay: 0.8 }}
                          >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-shrimp-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-4 border-white/10 rounded-full" />

                            <div className="relative space-y-2 xl:space-y-3">
                              {/* Icon */}
                              <div className="flex justify-center">
                                <div className="p-2 xl:p-2.5 bg-shrimp-400/20 rounded-xl backdrop-blur-sm border border-white/20">
                                  <svg
                                    className="w-6 h-6 xl:w-7 xl:h-7 text-shrimp-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                                  </svg>
                                </div>
                              </div>

                              {/* Number */}
                              <div className="text-center">
                                <div className="text-3xl xl:text-4xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-shrimp-200 bg-clip-text text-transparent leading-tight">
                                  {datasetsData.data.count.toLocaleString(
                                    'id-ID'
                                  )}
                                </div>
                              </div>

                              {/* Label */}
                              <div className="text-center space-y-0.5 xl:space-y-1">
                                <div className="text-xs xl:text-sm font-semibold text-neutral-100 tracking-wide uppercase">
                                  Dataset
                                </div>
                                <div className="text-xs text-neutral-300/80">
                                  Data Terbuka
                                </div>
                              </div>

                              {/* Decorative Line */}
                              <div className="flex justify-center pt-0.5 xl:pt-1">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-shrimp-400/50 to-transparent rounded-full" />
                              </div>
                            </div>
                          </MotionDiv>
                        )}
                        {visualizationsData && (
                          <MotionDiv
                            className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 xl:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:scale-[1.02] transition-transform duration-300"
                            initial="hidden"
                            animate={shouldAnimate ? "visible" : undefined}
                            whileInView={!isDirectHash ? "visible" : undefined}
                            viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
                            variants={scaleInVariants}
                            transition={{ delay: 1.0 }}
                          >
                            {/* Decorative Elements */}
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-sunshine-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 border-4 border-white/10 rounded-full" />

                            <div className="relative space-y-2 xl:space-y-3">
                              {/* Icon */}
                              <div className="flex justify-center">
                                <div className="p-2 xl:p-2.5 bg-sunshine-400/20 rounded-xl backdrop-blur-sm border border-white/20">
                                  <svg
                                    className="w-6 h-6 xl:w-7 xl:h-7 text-sunshine-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                  </svg>
                                </div>
                              </div>

                              {/* Number */}
                              <div className="text-center">
                                <div className="text-3xl xl:text-4xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-sunshine-200 bg-clip-text text-transparent leading-tight">
                                  {visualizationsData.data.count.toLocaleString(
                                    'id-ID'
                                  )}
                                </div>
                              </div>

                              {/* Label */}
                              <div className="text-center space-y-0.5 xl:space-y-1">
                                <div className="text-xs xl:text-sm font-semibold text-neutral-100 tracking-wide uppercase">
                                  Visualisasi
                                </div>
                                <div className="text-xs text-neutral-300/80">
                                  Grafik & Diagram
                                </div>
                              </div>

                              {/* Decorative Line */}
                              <div className="flex justify-center pt-0.5 xl:pt-1">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sunshine-400/50 to-transparent rounded-full" />
                              </div>
                            </div>
                          </MotionDiv>
                        )}
                        {infographicsData && (
                          <MotionDiv
                            className="relative overflow-hidden bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 xl:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:scale-[1.02] transition-transform duration-300"
                            initial="hidden"
                            animate={shouldAnimate ? "visible" : undefined}
                            whileInView={!isDirectHash ? "visible" : undefined}
                            viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
                            variants={scaleInVariants}
                            transition={{ delay: 1.2 }}
                          >
                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-data-400/20 rounded-full blur-3xl group-hover:blur-[80px] transition-all duration-300" />
                            <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-white/10 rounded-full" />
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-white/10 rotate-45" />

                            <div className="relative space-y-2 xl:space-y-3">
                              {/* Icon */}
                              <div className="flex justify-center">
                                <div className="p-2 xl:p-2.5 bg-data-400/20 rounded-xl backdrop-blur-sm border border-white/20">
                                  <svg
                                    className="w-6 h-6 xl:w-7 xl:h-7 text-data-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                  </svg>
                                </div>
                              </div>

                              {/* Number */}
                              <div className="text-center">
                                <div className="text-3xl xl:text-4xl font-bold bg-gradient-to-br from-neutral-50 via-neutral-100 to-data-200 bg-clip-text text-transparent leading-tight">
                                  {infographicsData.data.count.toLocaleString(
                                    'id-ID'
                                  )}
                                </div>
                              </div>

                              {/* Label */}
                              <div className="text-center space-y-0.5 xl:space-y-1">
                                <div className="text-xs xl:text-sm font-semibold text-neutral-100 tracking-wide uppercase">
                                  Infografik
                                </div>
                                <div className="text-xs text-neutral-300/80">
                                  Infografik Visual Menarik
                                </div>
                              </div>

                              {/* Decorative Line */}
                              <div className="flex justify-center pt-0.5 xl:pt-1">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-data-400/50 to-transparent rounded-full" />
                              </div>
                            </div>
                          </MotionDiv>
                        )}
                      </div>
                    </div>
                  ) : null}
                </MotionDiv>

                {/* CTA Button */}
                <MotionDiv
                  className="mt-4 xl:mt-8"
                  initial="hidden"
                  animate={shouldAnimate ? "visible" : undefined}
                  whileInView={!isDirectHash ? "visible" : undefined}
                  viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
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
              initial="hidden"
              animate={shouldAnimate ? "visible" : undefined}
              whileInView={!isDirectHash ? "visible" : undefined}
              viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
              variants={fadeInRightVariants}
              transition={{ delay: 0.8 }}
            >
              <MotionDiv
                className="rounded-2xl overflow-hidden h-[400px]"
                initial="hidden"
                animate={shouldAnimate ? "visible" : undefined}
                whileInView={!isDirectHash ? "visible" : undefined}
                viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
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
                initial="hidden"
                animate={shouldAnimate ? "visible" : undefined}
                whileInView={!isDirectHash ? "visible" : undefined}
                viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
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
                initial="hidden"
                animate={shouldAnimate ? "visible" : undefined}
                whileInView={!isDirectHash ? "visible" : undefined}
                viewport={!isDirectHash ? { once: true, amount: 0.3 } : undefined}
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
