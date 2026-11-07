import { useEffect, useLayoutEffect } from 'react';
import '../styles/main-scroll.css';
import useMainTransitions from '../hooks/useMainTransitions';
import { startSmoothScroll } from '../lib/smoothScroll';
import Hero from '../components/Hero';
import PainPoints from '../components/PainPoints';
import Services from '../components/Services';
import Founder from '../components/Founder';
import Reviews from '../components/Reviews';
import Booking from '../components/Booking';

export default function HomePage() {
  // Smooth scroll + scroll hand-overs only exist while the main homepage is on
  // screen (legal pages and Become a VA keep native scrolling).
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.add('tvl-main-mode');
    return () => html.classList.remove('tvl-main-mode');
  }, []);
  useEffect(() => startSmoothScroll(), []);
  useMainTransitions();

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