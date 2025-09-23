'use client';
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
    <section
      className="bg-[#2E91DB] relative"
      style={{ height: sectionHeight }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full">
          {/* Static Content */}
          <div className="sticky top-20 flex flex-col justify-center h-screen">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-lora">
                Satu Data
              </h2>
              <p className="text-lg text-gray-900 font-inter leading-relaxed">
                Platform terintegrasi yang menyatukan seluruh data pemerintah
                Kota Cirebon dalam satu ekosistem yang mudah diakses dan
                dipahami. Dengan prinsip "Satu Data", kami memastikan
                konsistensi, akurasi, dan transparansi informasi publik.
              </p>
            </div>
          </div>

          {/* Scrolling images */}
          <div ref={imagesContainerRef} className="space-y-20 pt-16 pb-16">
            {/* First image */}
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/beranda-opendata.png"
                alt="Open Data Portal Cirebon"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>

            {/* Second image */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/vector-4.png"
                alt="Data Visualization"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>

            {/* Third image */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/quality-data.png"
                alt="Data Analysis"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
