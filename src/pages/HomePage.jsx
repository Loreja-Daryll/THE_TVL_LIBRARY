import { useState } from 'react';
import '../styles/home-rebuild.css';
import Hero from '../components/home/Hero';
import TrustStrip from '../components/home/TrustStrip';
import ServicesCarousel from '../components/home/ServicesCarousel';
import OurWork from '../components/home/OurWork';
import FreePreview from '../components/home/FreePreview';
import TeamSection from '../components/home/TeamSection';
import PricingSection from '../components/home/PricingSection';
import FaqSection from '../components/home/FaqSection';
import FinalCta from '../components/home/FinalCta';
import MobileStickyCta from '../components/home/MobileStickyCta';

export default function HomePage() {
  // Clicking "Get a free ad concept" (etc.) on the services carousel or the
  // work grid jumps straight to step 2 of the Free Preview form, with that
  // type pre-selected.
  const [initialPreviewType, setInitialPreviewType] = useState(null);

  const handleSelectPreview = (type) => {
    setInitialPreviewType(type || 'choose');
    const target = document.getElementById('free-preview');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="tvl-rebuild">
      <Hero />
      <TrustStrip />
      <ServicesCarousel onSelectPreview={handleSelectPreview} />
      <OurWork onSelectPreview={handleSelectPreview} />
      <FreePreview
        initialPreviewType={initialPreviewType}
        onConsumedInitial={() => setInitialPreviewType(null)}
      />
      <TeamSection />
      <PricingSection />
      <FaqSection />
      <FinalCta />
      <MobileStickyCta />
    </div>
  );
}
