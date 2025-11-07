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
  const [sectionHeight, setSectionHeight] = useState('1827px');

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
      id="satu-data"
      className="relative min-h-screen bg-data-50 text-navy-700"
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
            className="sticky top-20 flex flex-col py-16 h-[calc(100vh-80px)]"
            variants={fadeInLeftVariants}
          >
            <div className="space-y-6 overflow-hidden">
              <AnimatedText
                text="Satu Data Kota Cirebon"
                className="text-4xl lg:text-5xl font-bold font-lora text-navy-700"
                delay={0.2}
              />
              <MotionP
                className="text-lg font-inter leading-relaxed text-neutral-700"
                variants={fadeInUpVariants}
                transition={{ delay: 0.4 }}
              >
                Portal pengelolaan data bagi Produsen Data Cirebon Satu Data.
                Melalui portal ini, produsen data dapat saling berbagi dan
                memanfaatkan data yang akurat, terstandar, serta mudah diakses
                untuk mendukung perumusan kebijakan yang lebih terukur di
                lingkungan Pemerintah Kota Cirebon.
              </MotionP>

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

              <Image
                src="/beranda-satudata.png"
                alt="Satu Data Portal Cirebon"
                width={800}
                height={800}
                className="w-full h-auto rounded-xl"
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
                src="/satudat-1.png"
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
                src="/satudat-2.png"
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
  );
}
