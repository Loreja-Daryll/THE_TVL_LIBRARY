import { gsap } from './smoothScroll';

/**
 * Shared engine behind SectionBackdrop. One gsap.ticker callback drives every
 * registered section's video.currentTime instead of each section running its
 * own ticker callback and its own fetch. Responsibilities:
 *
 *  - Frame-rate independent damping of currentTime toward the scroll-driven
 *    target (exponential decay, so it feels like continuous playback whether
 *    the tab is at 30fps or 120fps).
 *  - Only the sections near the viewport (per IntersectionObserver) are
 *    ticked, seeked or kept loaded; everything else is idle.
 *  - Clips are fetched as a Blob + object URL so seeking is instant once
 *    loaded, and released (URL revoked, video src cleared) once a section is
 *    2+ sections away from anything visible, to keep memory bounded.
 *  - A soft opacity "seam" fades each clip in/out over the first and last
 *    15% of its own scroll range so adjacent clips blend instead of cutting.
 *
 * Registration order == DOM order (sections mount top to bottom), which is
 * all that's needed to know "the next clip" and "2+ away" for preload/release.
 */

const DAMPING_K = 7; // exponential decay rate; higher = tighter follow
const FRAME_STEP = 1 / 24; // seconds; don't re-seek for sub-frame deltas
const SEAM_FRACTION = 0.15; // fraction of progress faded at each end of a clip
const SLOW_SEEK_MS = 150; // dev-only heuristic for "this clip isn't all-keyframe"

const entries = [];
let tickerAdded = false;

function seamOpacity(progress) {
  if (progress < SEAM_FRACTION) return Math.max(0, progress / SEAM_FRACTION);
  if (progress > 1 - SEAM_FRACTION) return Math.max(0, (1 - progress) / SEAM_FRACTION);
  return 1;
}

function loadClip(entry) {
  if (entry.blobState !== 'idle' || !entry.video) return;
  entry.blobState = 'loading';
  const controller = new AbortController();
  entry.abortController = controller;

  fetch(entry.video, { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`[TVL] backdrop fetch failed: ${entry.video}`);
      return res.blob();
    })
    .then((blob) => {
      if (entry.blobState !== 'loading') return; // released mid-flight
      entry.blobUrl = URL.createObjectURL(blob);
      entry.blobState = 'loaded';
      if (entry.videoEl) {
        entry.videoEl.src = entry.blobUrl;
        entry.videoEl.load();
      }
    })
    .catch(() => {
      if (entry.blobState === 'loading') entry.blobState = 'idle';
    });
}

function releaseClip(entry) {
  entry.abortController?.abort();
  entry.abortController = null;
  if (entry.blobUrl) {
    URL.revokeObjectURL(entry.blobUrl);
    entry.blobUrl = null;
  }
  entry.blobState = 'idle';
  entry.ready = false;
  entry.current = 0;
  entry.seekPendingSince = null;
  entry.onReadyChange?.(false);
  if (entry.videoEl) {
    entry.videoEl.removeAttribute('src');
    entry.videoEl.load();
  }
}

function recomputeLoadTargets() {
  const activeIdx = entries.filter((e) => e.intersecting).map((e) => e.index);
  if (!activeIdx.length) return;
  const wanted = new Set();
  activeIdx.forEach((i) => {
    wanted.add(i - 1);
    wanted.add(i);
    wanted.add(i + 1);
  });

  entries.forEach((entry) => {
    const minDist = activeIdx.reduce((m, i) => Math.min(m, Math.abs(i - entry.index)), Infinity);
    if (wanted.has(entry.index)) {
      loadClip(entry);
    } else if (minDist >= 2 && entry.blobState !== 'idle') {
      releaseClip(entry);
    }
  });
}

function seekTo(entry, v, t, time) {
  if (typeof v.fastSeek === 'function') v.fastSeek(t);
  else v.currentTime = t;
  if (entry.seekPendingSince == null) entry.seekPendingSince = time;
}

function tick(time, deltaMs) {
  const dt = Math.min(deltaMs / 1000, 0.1); // clamp spikes (tab switches, long tasks)

  entries.forEach((entry) => {
    if (!entry.intersecting) return;
    const v = entry.videoEl;
    if (!v) return;

    const seam = seamOpacity(entry.target);
    if (entry.wrapEl) entry.wrapEl.style.setProperty('--bd-seam', seam.toFixed(3));

    if (!entry.ready || !v.duration) return;

    entry.current += (entry.target - entry.current) * (1 - Math.exp(-dt * DAMPING_K));
    const dur = v.duration;
    const t = Math.min(dur - 0.05, Math.max(0, entry.current * dur));

    if (v.seeking) {
      if (entry.seekPendingSince != null && !entry.warnedSlowSeek && (time - entry.seekPendingSince) * 1000 > SLOW_SEEK_MS) {
        entry.warnedSlowSeek = true;
        if (import.meta.env?.DEV) {
          console.warn(
            `[TVL] "${entry.video}" is taking >${SLOW_SEEK_MS}ms to seek. ` +
              'It is probably not encoded all-keyframe (GOP 1), which makes scrubbing choppy. ' +
              'Re-encode with ffmpeg -g 1 (or your encoder\'s "every frame is a keyframe" option).'
          );
        }
      }
      return;
    }
    entry.seekPendingSince = null;

    if (Math.abs(t - v.currentTime) >= FRAME_STEP) seekTo(entry, v, t, time);
  });
}

function ensureTicker() {
  if (tickerAdded) return;
  gsap.ticker.add(tick);
  tickerAdded = true;
}

export function registerBackdrop({ video, videoEl, wrapEl, onReadyChange }) {
  const entry = {
    index: entries.length,
    video,
    videoEl,
    wrapEl,
    onReadyChange,
    target: 0,
    current: 0,
    ready: false,
    intersecting: false,
    blobState: 'idle',
    blobUrl: null,
    abortController: null,
    seekPendingSince: null,
    warnedSlowSeek: false,
  };
  entries.push(entry);
  ensureTicker();
  return entry;
}

export function unregisterBackdrop(entry) {
  if (!entry) return;
  releaseClip(entry);
  const i = entries.indexOf(entry);
  if (i !== -1) entries.splice(i, 1);
}

export function setIntersecting(entry, value) {
  if (!entry || entry.intersecting === value) return;
  entry.intersecting = value;
  recomputeLoadTargets();
}

export function setReady(entry, value) {
  if (!entry) return;
  entry.ready = value;
  entry.onReadyChange?.(value);
}

export function setTarget(entry, value) {
  if (entry) entry.target = value;
}
