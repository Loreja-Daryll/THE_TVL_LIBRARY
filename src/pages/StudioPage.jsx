import { useEffect, useLayoutEffect, useRef } from 'react';
import '../styles/home.css';
import '../styles/studio-base.css';
import useGsapReveal from '../hooks/useGsapReveal';
import useSectionTransitions from '../hooks/useSectionTransitions';
import usePointerEffects from '../hooks/usePointerEffects';
import IntroLoader, { whenIntroDone } from '../components/home/IntroLoader';
import SectionDots from '../components/home/SectionDots';
import { startActiveSectionTracking } from '../lib/activeSection';
import { scrollToTarget, startSmoothScroll } from '../lib/smoothScroll';
import { startPerfGuard } from '../lib/perfGuard';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import SelectedWork from '../components/home/SelectedWork';
import HowItWorks from '../components/home/HowItWorks';
import WhyWorkWithTvl from '../components/home/WhyWorkWithTvl';
import FaqTalk from '../components/home/FaqTalk';
import ReadyToGrow from '../components/home/ReadyToGrow';

export default function StudioPage() {
  const pageRef = useRef(null);

  // Everything below only exists while the Creative Studio is on screen, so the
  // main TVL site keeps its own native scrolling and the old behavior.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const prevTitle = document.title;
    html.classList.add('tvl-studio-mode');
    document.title = 'Creative Studio | The VA Library';
    return () => {
      html.classList.remove('tvl-studio-mode');
      document.title = prevTitle;
    };
  }, []);
  useEffect(() => startSmoothScroll(), []);
  useEffect(() => startPerfGuard(), []);

  useGsapReveal(pageRef);
  useSectionTransitions(pageRef);
  usePointerEffects(pageRef);

  // Opening a link like /#faq: teleport there once layout and the intro are ready,
  // THEN start syncing the URL hash (so tracking never erases the hash first).
  useEffect(() => {
    let stopTracking = () => {};
    let timer = 0;
    const cancelWait = whenIntroDone(() => {
      timer = window.setTimeout(() => {
        const { hash } = window.location;
        if (hash && document.querySelector(hash)) scrollToTarget(hash);
        stopTracking = startActiveSectionTracking();
      }, 250);
    });
    return () => {
      cancelWait();
      window.clearTimeout(timer);
      stopTracking();
    };
  }, []);

  return (
    <div className="tvl-home" ref={pageRef}>
      <IntroLoader />
      <SectionDots />
      <Hero />
      <Services />
      <SelectedWork />
      <HowItWorks />
      <WhyWorkWithTvl />
      <FaqTalk />
      <ReadyToGrow />
    </div>
  );
}
