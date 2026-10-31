import { useEffect, useRef } from 'react';
import { ScrollTrigger, prefersReducedMotion } from '../../lib/smoothScroll';
import { registerBackdrop, unregisterBackdrop, setIntersecting, setTarget, setReady } from '../../lib/backdropManager';

/**
 * Layered section background. If a video is set, it is NOT played: scrolling
 * through the section drives video.currentTime via backdropManager's shared
 * ticker (one damped, frame-rate independent loop for every section, not one
 * per section).
 *   scroll down   -> clip moves forward
 *   scroll up     -> clip rewinds
 *   stop scrolling -> clip holds still
 * The clip is at its first frame when the section reaches mid-screen and at its
 * last frame when the section's bottom reaches mid-screen, so chained clips
 * (last frame of clip N = first frame of clip N+1) look like one video. A
 * poster image sits underneath and crossfades with the video on load/release
 * so the background is never blank and never pops.
 *
 * Props come from `backdrops` in src/data/homeContent.js.
 * Leave video empty for the gradient-only version (no network cost).
 */
export default function SectionBackdrop({ video = '', poster = '', variant = 'ink' }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const posterRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    const wrap = wrapRef.current;
    const section = wrap?.parentElement;
    if (!v || !wrap || !section || !video) return undefined;

    const onError = () => console.warn(`[TVL] Video failed to load: ${video} (check file name, folder and case)`);
    v.addEventListener('error', onError);

    // Reduced motion: no scrubbing, no blob prefetch. Just show the first
    // frame directly, same as a static poster would, and never animate.
    if (prefersReducedMotion()) {
      const onMetaReduced = () => {
        // muted + playsInline allows a quick play/pause "unlock" so iOS will seek
        v.play().then(() => v.pause()).catch(() => {});
        v.currentTime = 0;
      };
      v.addEventListener('loadedmetadata', onMetaReduced);
      v.src = video;
      v.preload = 'auto';
      v.load();
      return () => {
        v.removeEventListener('loadedmetadata', onMetaReduced);
        v.removeEventListener('error', onError);
      };
    }

    const entry = registerBackdrop({
      video,
      videoEl: v,
      wrapEl: wrap,
      onReadyChange: (ready) => {
        v.classList.toggle('is-ready', ready);
        posterRef.current?.classList.toggle('is-hidden', ready);
      },
    });

    const onMeta = () => {
      v.play().then(() => v.pause()).catch(() => {});
      v.currentTime = 0;
      setReady(entry, true);
    };
    v.addEventListener('loadedmetadata', onMeta);

    // Only fetch the clip when its section is near the screen (backdropManager
    // also preloads the next section's clip and releases clips 2+ away)
    const io = new IntersectionObserver(
      ([intersectionEntry]) => setIntersecting(entry, intersectionEntry.isIntersecting),
      { rootMargin: '100% 0px' }
    );
    io.observe(section);

    const isHero = variant === 'hero';
    const st = ScrollTrigger.create({
      trigger: section,
      start: isHero ? 'top top' : 'top 50%',
      end: 'bottom 50%',
      onUpdate: (self) => setTarget(entry, self.progress),
    });
    setTarget(entry, st.progress);

    return () => {
      st.kill();
      io.disconnect();
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('error', onError);
      unregisterBackdrop(entry);
    };
  }, [video, variant]);

  return (
    <div className={`tvl-home-bd tvl-home-bd--${variant}`} ref={wrapRef} aria-hidden="true">
      {video ? (
        <>
          {poster ? (
            <img
              ref={posterRef}
              className="tvl-home-bd-poster"
              src={poster}
              alt=""
              loading={variant === 'hero' ? 'eager' : 'lazy'}
            />
          ) : null}
          <video ref={videoRef} className="tvl-home-bd-video" muted playsInline preload="none" />
        </>
      ) : null}
      <span className="tvl-home-bd-glow tvl-home-bd-glow--a" data-parallax="12" />
      <span className="tvl-home-bd-glow tvl-home-bd-glow--b" data-parallax="22" />
      <span className="tvl-home-bd-grain" />
      <span className="tvl-home-bd-shade" />
    </div>
  );
}
