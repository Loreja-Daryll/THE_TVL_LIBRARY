import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Services from './components/Services';
import Founder from './components/Founder';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import Footer from './components/Footer';

// Section order copied exactly from templates/index.json → "order":
// [hero, pain_points, services, founder, reviews, booking, tvlfooter]
export default function App() {
  return (
    <>
      <AmbientBackground />
      <CustomCursor />
      <Nav />
      <Hero />
      <PainPoints />
      <Services />
      <Founder />
      <Reviews />
      <Booking />
      <Footer />
    </>
  );
}
