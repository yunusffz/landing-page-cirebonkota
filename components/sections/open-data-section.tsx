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
        className="bg-[#2E91DB] relative min-h-screen"
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
                  text="Open Data"
                  className="text-4xl lg:text-5xl font-bold text-[#F9FAFB] font-lora"
                  delay={0.2}
                />
                <MotionP
                  className="text-lg text-gray-200 font-inter leading-relaxed"
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
                    <div className="text-gray-300 text-sm">Memuat data...</div>
                  ) : datasetsData || articlesData ? (
                    <div className="grid grid-cols-2 gap-4">
                      {/* Dataset Count */}
                      {datasetsData && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">
                              {datasetsData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-gray-200">Dataset</div>
                          </div>
                        </div>
                      )}

                      {/* Article Count */}
                      {articlesData && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">
                              {articlesData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-gray-200">Artikel</div>
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
                    className="inline-flex items-center px-6 py-3 bg-white text-[#2E91DB] font-semibold rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
          <div className="lg:grid-cols-2 gap-8 lg:gap-12 h-full hidden lg:grid">
            {/* Static Content */}
            <MotionDiv
              className="sticky top-20 flex flex-col justify-center h-screen"
              variants={fadeInLeftVariants}
            >
              <div className="space-y-6">
                <AnimatedText
                  text="Open Data"
                  className="text-4xl lg:text-5xl font-bold text-[#F9FAFB] font-lora"
                  delay={0.2}
                />
                <MotionP
                  className="text-lg text-gray-200 font-inter leading-relaxed"
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
                    <div className="text-gray-300 text-sm">Memuat data...</div>
                  ) : datasetsData || articlesData ? (
                    <div className="grid grid-cols-2 gap-4">
                      {/* Dataset Count */}
                      {datasetsData && (
                        <MotionDiv
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                          variants={scaleInVariants}
                          transition={{ delay: 0.8 }}
                        >
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">
                              {datasetsData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-gray-200">Dataset</div>
                          </div>
                        </MotionDiv>
                      )}

                      {/* Article Count */}
                      {articlesData && (
                        <MotionDiv
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                          variants={scaleInVariants}
                          transition={{ delay: 1.0 }}
                        >
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">
                              {articlesData.data.count.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-gray-200">Artikel</div>
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
                    className="inline-flex items-center px-6 py-3 bg-white text-[#2E91DB] font-semibold rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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

            {/* Desktop Scrolling images - visible lg and above */}
            <MotionDiv
              ref={imagesContainerRef}
              className="space-y-20 pt-16 pb-16"
              variants={fadeInRightVariants}
              transition={{ delay: 0.8 }}
            >
              {/* First image */}
              <MotionDiv
                className="rounded-2xl overflow-hidden"
                variants={scaleInVariants}
                transition={{ delay: 1.0 }}
              >
                <Image
                  src="/beranda-opendata.png"
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
                transition={{ delay: 1.2 }}
              >
                <Image
                  src="/free-access.png"
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
                transition={{ delay: 1.4 }}
              >
                <Image
                  src="/quality-data.png"
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
    </>
  );
}
