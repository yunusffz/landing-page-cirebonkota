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
import Finance from '@/public/Finance.json';
import Lottie from 'lottie-react';

export default function HeroSection() {
  return (
    <MotionSection
      id="home"
      className="h-[calc(100vh-80px)] bg-contain bg-center bg-no-repeat text-white flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/bg-main.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-30">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <MotionDiv variants={fadeInLeftVariants}>
            <AnimatedText
              text="Ekosistem Data Kota Cirebon"
              className="text-[49px] font-bold mb-6 font-lora text-[#022b55]"
              delay={0.2}
            />
            <MotionP
              className="mb-8 text-gray-500 max-w-3xl font-inter"
              variants={fadeInUpVariants}
              transition={{ delay: 0.4 }}
            >
              Platform terintegrasi untuk akses data terbuka, transparansi
              informasi publik, dan inovasi digital Pemerintah Kota Cirebon.
              Menghubungkan data, kebijakan, dan layanan dalam satu ekosistem
              yang mudah diakses masyarakat.
            </MotionP>
          </MotionDiv>

          {/* Lottie Animation */}
          <MotionDiv
            className="lg:flex justify-center lg:justify-end hidden"
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
                loop={true}
                autoplay={true}
                className="w-full h-auto"
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
