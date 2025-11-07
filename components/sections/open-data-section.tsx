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
      `}</style>

      <MotionSection
        id="open-data"
        className="relative min-h-screen bg-data-700"
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
                  text="Open Data Kota Cirebon"
                  className="text-4xl lg:text-5xl font-bold text-neutral-50 font-lora"
                  delay={0.2}
                />
                <MotionP
                  className="text-lg text-neutral-100 font-inter leading-relaxed"
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

                {/* Dataset and Article Count Display */}
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
                        <div className="bg-neutral-50/10 backdrop-blur-sm rounded-lg p-4 border border-neutral-100/20">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-neutral-50 mb-2">
                              {datasetsData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-neutral-100">
                              Dataset
                            </div>
                          </div>
                        </div>
                      )}
                      {articlesData && (
                        <div className="bg-neutral-50/10 backdrop-blur-sm rounded-lg p-4 border border-neutral-100/20">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-neutral-50 mb-2">
                              {articlesData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-neutral-100">
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

                <Image
                  src="/beranda-opendata.png"
                  alt="Open Data Portal Cirebon"
                  width={800}
                  height={300}
                  className="w-full h-auto"
                />
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
                  className="text-5xl font-bold text-neutral-50 font-lora"
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
