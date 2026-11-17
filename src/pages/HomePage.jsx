import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import Services from '../components/Services';
import Founder from '../components/Founder';
import Reviews from '../components/Reviews';
import Booking from '../components/Booking';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Services />
      <Founder />
      <Reviews />
      <Booking />
    </>
  );
}