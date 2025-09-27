import HeroSection from '@/components/sections/hero-section';
import OpenDataSection from '@/components/sections/open-data-section';
import SatuDataSection from '@/components/sections/satu-data-section';
import SatuPetaSection from '@/components/sections/satu-peta-section';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OpenDataSection />
      <SatuDataSection />
      <SatuPetaSection />
    </div>
  );
}
