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
      id="satu-data"
      className="bg-[#6de0f6] relative text-gray-900"
      style={{ height: sectionHeight }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full">
          {/* Static Content */}
          <MotionDiv
            className="sticky top-20 flex flex-col justify-center h-screen"
            variants={fadeInLeftVariants}
          >
            <div className="space-y-6">
              <AnimatedText
                text="Satu Data"
                className="text-4xl lg:text-5xl font-bold font-lora"
                delay={0.2}
              />
              <MotionP
                className="text-lg font-inter leading-relaxed text-[#0f172a]"
                variants={fadeInUpVariants}
                transition={{ delay: 0.4 }}
              >
                Portal Satu Data adalah platform terpadu untuk memperkuat tata
                kelola data. Kami memastikan integrasi dan standarisasi data ,
                sehingga menghasilkan data yang berkualitas, andal, dan siap
                digunakan untuk analisis yang akurat.
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
                  className="inline-flex items-center px-6 py-3  bg-white text-[#3ca7bd] font-semibold rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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

          {/* Scrolling images */}
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
                src="/beranda-satudata.png"
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
                src="/satudata-1.png"
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
                src="/satudata-2.png"
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
