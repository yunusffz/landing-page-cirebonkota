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

export default function SatuDataSection() {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState('1827px');
  const {
    data: mapsetsData,
    isLoading: mapsetsLoading,
    error: mapsetsError,
  } = useMapsets();

  // Debug logging
  console.log('Mapsets data:', mapsetsData);
  console.log('Mapsets loading:', mapsetsLoading);
  console.log('Mapsets error:', mapsetsError);

  useEffect(() => {
    const updateHeight = () => {
      if (imagesContainerRef.current) {
        const height = imagesContainerRef.current.scrollHeight;
        setSectionHeight(`${height}px`);
      }
    };

    // Update height on mount
    updateHeight();

    // Update height on window resize
    window.addEventListener('resize', updateHeight);

    // Update height when images load
    const images = imagesContainerRef.current?.querySelectorAll('img');
    if (images) {
      images.forEach(img => {
        img.addEventListener('load', updateHeight);
      });
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      if (images) {
        images.forEach(img => {
          img.removeEventListener('load', updateHeight);
        });
      }
    };
  }, []);

  return (
    <MotionSection
      id="satu-peta"
      className="bg-[#fdcd47] relative min-h-screen text-gray-900"
      style={{ height: sectionHeight }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="lg:hidden">
          <MotionDiv
            className="sticky top-20 flex flex-col py-16 h-screen"
            variants={fadeInLeftVariants}
          >
            <div className="space-y-6 overflow-hidden">
              <AnimatedText
                text="Satu Peta"
                className="text-4xl lg:text-5xl font-bold font-lora"
                delay={0.2}
              />
              <MotionP
                className="text-lg font-inter leading-relaxed text-[#0f172a]"
                variants={fadeInUpVariants}
                transition={{ delay: 0.4 }}
              >
                Portal Satu Data adalah platform untuk memastikan integrasi dan
                standarisasi data spasial, sehingga menghasilkan data yang
                berkualitas, andal, dan siap digunakan untuk analisis yang
                akurat.
              </MotionP>

              <div className="mt-6">
                {mapsetsLoading ? (
                  <div className="text-gray-300 text-sm">Memuat data...</div>
                ) : mapsetsError ? (
                  <div className="text-red-300 text-sm">
                    Error: {mapsetsError.message}
                  </div>
                ) : mapsetsData ? (
                  <div className="grid gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {mapsetsData.data.count.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-gray-900">Mapset</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-300 text-sm">
                    Tidak ada data tersedia
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <MotionDiv
                className="mt-8"
                variants={fadeInUpVariants}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="https://satudata.cirebonkota.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-[#f7b500] font-semibold rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
                className="w-full h-auto"
              />
            </div>
          </MotionDiv>
        </div>
        <div className="lg:grid-cols-2 gap-8 lg:gap-12 h-full hidden lg:grid">
          {/* Static Content */}
          <MotionDiv
            className="sticky top-20 flex flex-col justify-center h-screen"
            variants={fadeInLeftVariants}
          >
            <div className="space-y-6">
              <AnimatedText
                text="Satu Peta"
                className="text-4xl lg:text-5xl font-bold font-lora"
                delay={0.2}
              />
              <MotionP
                className="text-lg font-inter leading-relaxed text-[#0f172a]"
                variants={fadeInUpVariants}
                transition={{ delay: 0.4 }}
              >
                Portal Satu Data adalah platform untuk memastikan integrasi dan
                standarisasi data spasial, sehingga menghasilkan data yang
                berkualitas, andal, dan siap digunakan untuk analisis yang
                akurat.
              </MotionP>

              <MotionDiv
                className="mt-6"
                variants={fadeInUpVariants}
                transition={{ delay: 0.6 }}
              >
                {mapsetsLoading ? (
                  <div className="text-gray-300 text-sm">Memuat data...</div>
                ) : mapsetsError ? (
                  <div className="text-red-300 text-sm">
                    Error: {mapsetsError.message}
                  </div>
                ) : mapsetsData ? (
                  <div className="grid gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {mapsetsData.data.count.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-gray-900">Mapset</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-300 text-sm">
                    Tidak ada data tersedia
                  </div>
                )}
              </MotionDiv>

              {/* CTA Button */}
              <MotionDiv
                className="mt-8"
                variants={fadeInUpVariants}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="https://satudata.cirebonkota.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3  bg-white text-[#f7b500] font-semibold rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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

          {/* Desktop Scrolling images - visible lg and above */}
          <MotionDiv
            ref={imagesContainerRef}
            className="space-y-20 pt-16 pb-16"
            variants={fadeInRightVariants}
            transition={{ delay: 0.6 }}
          >
            {/* First image */}
            <MotionDiv
              className="rounded-2xl overflow-hidden"
              variants={scaleInVariants}
              transition={{ delay: 0.8 }}
            >
              <Image
                src="/beranda-satupeta.png"
                alt="Open Data Portal Cirebon"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </MotionDiv>

            {/* Second image */}
            <MotionDiv
              className="rounded-xl overflow-hidden"
              variants={scaleInVariants}
              transition={{ delay: 1.0 }}
            >
              <Image
                src="/satupeta-1.png"
                alt="Data Visualization"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </MotionDiv>

            {/* Third image */}
            <MotionDiv
              className="rounded-xl overflow-hidden"
              variants={scaleInVariants}
              transition={{ delay: 1.2 }}
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
