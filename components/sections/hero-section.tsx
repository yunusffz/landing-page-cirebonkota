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
      className="relative flex items-center justify-center h-[calc(100vh-80px)] overflow-hidden text-navy-700"
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
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Text */}
          <MotionDiv variants={fadeInLeftVariants}>
            <AnimatedText
              text="Cirebon Satu Data"
              className="text-[48px] lg:text-[56px] font-bold mb-6 font-lora text-navy-800"
              delay={0.2}
            />
            <MotionP
              className="mb-8 text-neutral-700 max-w-3xl font-inter leading-relaxed"
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
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-shrimp-400 hover:bg-shrimp-500 text-neutral-50 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <span>Jelajahi Data</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </MotionDiv>
          </MotionDiv>

          {/* Right - Lottie Animation */}
          <MotionDiv
            className="hidden lg:flex justify-center lg:justify-end"
            variants={fadeInRightVariants}
            transition={{ delay: 0.6 }}
          >
            <MotionDiv
              className="w-full max-w-md lg:max-w-lg"
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
