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
  const [sectionHeight, setSectionHeight] = useState('1827px');
  const {
    data: mapsetsData,
    isLoading: mapsetsLoading,
    error: mapsetsError,
  } = useMapsets();

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
    <MotionSection
      id="satu-peta"
      className="relative min-h-screen bg-sunshine-100 text-navy-700"
      style={{ height: sectionHeight }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Mobile layout */}
        <div className="lg:hidden">
          <MotionDiv
            className="sticky top-20 flex flex-col py-16 h-screen"
            variants={fadeInLeftVariants}
          >
            <div className="space-y-6 overflow-hidden">
              <AnimatedText
                text="Satu Peta Kota Cirebon"
                className="text-4xl lg:text-5xl font-bold font-lora text-navy-700"
                delay={0.2}
              />
              <MotionP
                className="text-lg font-inter leading-relaxed text-neutral-800"
                variants={fadeInUpVariants}
                transition={{ delay: 0.4 }}
              >
                Portal data geospasial terpadu yang menyajikan informasi spasial
                Kota Cirebon secara akurat dan mudah diakses. Melalui portal
                ini, perangkat daerah dan masyarakat dapat menjelajahi,
                mengelola, serta berbagi data geospasial untuk mendukung
                perencanaan dan pengambilan kebijakan yang lebih terarah.
              </MotionP>

              {/* Mapset Count */}
              <MotionDiv
                className="mt-6"
                variants={fadeInUpVariants}
                transition={{ delay: 0.5 }}
              >
                {mapsetsLoading ? (
                  <div className="text-neutral-600 text-sm">Memuat data...</div>
                ) : mapsetsError ? (
                  <div className="text-red-500 text-sm">
                    Error: {mapsetsError.message}
                  </div>
                ) : mapsetsData ? (
                  <div className="grid gap-4">
                    <div className="bg-neutral-50/60 rounded-lg p-4 border border-neutral-200 shadow-sm">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-navy-700 mb-2">
                          {mapsetsData.data.count.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-navy-600">Mapset</div>
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

              <Image
                src="/beranda-satupeta.png"
                alt="Satu Peta Portal Cirebon"
                width={800}
                height={300}
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </MotionDiv>
        </div>

        {/* Desktop layout */}
        <div className="lg:grid-cols-2 gap-8 lg:gap-12 h-full hidden lg:grid">
          <MotionDiv
            className="sticky top-20 flex flex-col justify-center h-screen"
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
                Portal data geospasial terpadu yang menyajikan informasi spasial
                Kota Cirebon secara akurat dan mudah diakses. Melalui portal
                ini, perangkat daerah dan masyarakat dapat menjelajahi,
                mengelola, serta berbagi data geospasial untuk mendukung
                perencanaan dan pengambilan kebijakan yang lebih terarah.
              </MotionP>

              {/* Mapset Count */}
              <MotionDiv
                className="mt-6"
                variants={fadeInUpVariants}
                transition={{ delay: 0.6 }}
              >
                {mapsetsLoading ? (
                  <div className="text-neutral-600 text-sm">Memuat data...</div>
                ) : mapsetsError ? (
                  <div className="text-red-500 text-sm">
                    Error: {mapsetsError.message}
                  </div>
                ) : mapsetsData ? (
                  <div className="grid gap-4">
                    <div className="bg-neutral-50/60 rounded-lg p-4 border border-neutral-200 shadow-sm">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-navy-700 mb-2">
                          {mapsetsData.data.count.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-navy-600">Mapset</div>
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
            className="space-y-20 pt-16 pb-16"
            variants={fadeInRightVariants}
            transition={{ delay: 0.6 }}
          >
            <MotionDiv
              className="rounded-2xl overflow-hidden shadow-md"
              variants={scaleInVariants}
            >
              <Image
                src="/beranda-satupeta.png"
                alt="Satu Peta Portal"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </MotionDiv>
            <MotionDiv
              className="rounded-xl overflow-hidden shadow-md"
              variants={scaleInVariants}
            >
              <Image
                src="/satupeta-1.png"
                alt="Data Visualization"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </MotionDiv>
            <MotionDiv
              className="rounded-xl overflow-hidden shadow-md"
              variants={scaleInVariants}
            >
              <Image
                src="/satupeta-2.png"
                alt="Data Analysis"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
