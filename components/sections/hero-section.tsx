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
import Finance from '@/public/artboard.json';
import Lottie from 'lottie-react';

export default function HeroSection() {
  return (
    <MotionSection
      id="home"
      className="relative flex items-center justify-center min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] overflow-hidden text-navy-700"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg-main.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-data-100/90 via-neutral-50/85 to-white/90 backdrop-blur-[2px] opacity-10" />

      {/* Optional dark overlay for text readability if bg too bright */}
      {/* <div className="absolute inset-0 bg-navy-900/10" /> */}

      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:pt-20 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <MotionDiv variants={fadeInLeftVariants} className="w-full">
            <AnimatedText
              text="Cirebon Satu Data"
              className="text-[40px] sm:text-[48px] lg:text-[56px] font-bold mb-6 font-lora text-navy-800"
              delay={0.2}
            />
            <MotionP
              className="mb-8 text-neutral-700 max-w-3xl font-inter leading-relaxed text-base sm:text-lg"
              variants={fadeInUpVariants}
              transition={{ delay: 0.4 }}
            >
              Di Kota Cirebon, setiap data punya makna.{' '}
              <span className="text-data-600 font-semibold">
                Cirebon Satu Data
              </span>{' '}
              menjadi gerbang terpadu untuk mewujudkan keterbukaan, kolaborasi,
              dan kemudahan akses data bagi seluruh warga dan pemerintah kota.
            </MotionP>

            {/* CTA Button */}
            <MotionDiv variants={fadeInUpVariants} transition={{ delay: 0.6 }}>
              <a
                href="#open-data"
                className="inline-flex w-full text-center justify-center sm:w-[250px] items-center gap-3 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-shrimp-400 to-shrimp-500 hover:from-shrimp-500 hover:to-shrimp-600 text-white shadow-[0_8px_24px_rgba(244,114,82,0.25)] hover:shadow-[0_12px_32px_rgba(244,114,82,0.35)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                <span className="text-base sm:text-lg">Jelajahi Data</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </MotionDiv>
          </MotionDiv>

          {/* Lottie Animation - Visible on all screens */}
          <MotionDiv
            className="flex justify-center lg:justify-end w-full mt-8 lg:mt-0"
            variants={fadeInRightVariants}
            transition={{ delay: 0.6 }}
          >
            <MotionDiv
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
              variants={scaleInVariants}
              transition={{ delay: 0.8 }}
            >
              <Lottie
                animationData={Finance}
                loop
                autoplay
                className="w-full h-auto"
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
