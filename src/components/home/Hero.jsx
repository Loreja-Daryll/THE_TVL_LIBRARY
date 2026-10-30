import { useEffect, useRef, useState } from 'react';
import { LINKS } from '../../constants/links';

// A2: the phone feed scrolls down slowly, "stops" on an ad post, pulses it
// once, then continues. Pure CSS/JS, no video assets required.
// The ad posts' images are generated placeholder graphics
// (public/assets/tvl-home-hero-ad-*.jpg), just so the feed is viewable
// before real ad footage exists. The non-ad posts are left blank on
// purpose, since those stand in for other people's organic posts in
// someone's feed, not TVL's own content.
const FEED_POSTS = [
  { id: 'p1', isAd: false },
  { id: 'p2', isAd: false },
  { id: 'p3', isAd: true, image: '/assets/tvl-home-hero-ad-1.jpg' },
  { id: 'p4', isAd: false },
  { id: 'p5', isAd: false },
  { id: 'p6', isAd: true, image: '/assets/tvl-home-hero-ad-2.jpg' },
  { id: 'p7', isAd: false },
];

export default function Hero() {
  const trackRef = useRef(null);
  const [pulsedId, setPulsedId] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let cancelled = false;
    let index = 0;
    const postHeight = track.firstElementChild?.getBoundingClientRect().height || 0;

    async function step() {
      while (!cancelled) {
        const post = FEED_POSTS[index % FEED_POSTS.length];
        track.classList.add('is-playing');
        track.style.transform = `translateY(-${index * postHeight}px)`;

        // eslint-disable-next-line no-await-in-loop
        await wait(2600);
        if (cancelled) return;

        if (post.isAd) {
          setPulsedId(post.id);
          // eslint-disable-next-line no-await-in-loop
          await wait(900);
          if (cancelled) return;
          setPulsedId(null);
          // eslint-disable-next-line no-await-in-loop
          await wait(1200);
          if (cancelled) return;
        }

        index += 1;
        if (index >= FEED_POSTS.length) {
          index = 0;
          track.classList.remove('is-playing');
          track.style.transform = 'translateY(0)';
          // eslint-disable-next-line no-await-in-loop
          await wait(500);
        }
      }
    }

    function wait(ms) {
      return new Promise((resolve) => {
        const t = setTimeout(resolve, ms);
        return () => clearTimeout(t);
      });
    }

    step();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="tvl-rb-section tvl-rb-section--espresso tvl-rb-hero">
      <div className="tvl-rb-section__inner tvl-rb-hero__grid">
        <div className="tvl-rb-hero__content">
          <h1 className="tvl-rb-h1 tvl-rb-rise">
            Your brand deserves ads, a store and emails that actually convert.
          </h1>
          <p className="tvl-rb-body tvl-rb-rise tvl-rb-rise--2">
            We build AI UGC ads, Shopify websites and email marketing for
            growing ecom brands, without the agency price tag or the back
            and forth.
          </p>
          <div className="tvl-rb-hero__buttons tvl-rb-rise tvl-rb-rise--3">
            <a href="#free-preview" className="tvl-rb-btn-primary">
              Get a free preview for your brand
            </a>
            <a
              href={LINKS.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tvl-rb-btn-secondary"
            >
              Book a call instead
            </a>
          </div>
          <p className="tvl-rb-small tvl-rb-hero__under">
            No credit card. No obligation. Just real work for your brand.
          </p>
        </div>

        <div className="tvl-rb-hero__phone-wrap tvl-rb-rise tvl-rb-rise--phone">
          <div className="tvl-rb-hero__phone">
            <div className="tvl-rb-hero__feed">
              <div className="tvl-rb-hero__feed-track" ref={trackRef}>
                {FEED_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className={
                      'tvl-rb-hero__feed-post' +
                      (post.isAd ? ' tvl-rb-hero__feed-post--ad' : '') +
                      (pulsedId === post.id ? ' is-pulsed' : '')
                    }
                  >
                    {post.isAd && (
                      <>
                        <span className="tvl-rb-hero__feed-sponsored">Sponsored</span>
                        {post.image && <img src={post.image} alt="" aria-hidden="true" />}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
