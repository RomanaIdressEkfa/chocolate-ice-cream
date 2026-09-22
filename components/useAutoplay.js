'use client';

import { useEffect } from 'react';

/**
 * Keeps a muted background video playing in every situation browsers allow:
 * retries on load, restarts if something pauses it, resumes on tab focus and
 * falls back to the first user interaction when autoplay is blocked outright.
 */
export default function useAutoplay(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    const play = () => {
      const attempt = el.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') play();
    };

    play();
    el.addEventListener('loadeddata', play);
    el.addEventListener('canplay', play);
    el.addEventListener('pause', play);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointerdown', play, { once: true });
    window.addEventListener('keydown', play, { once: true });

    return () => {
      el.removeEventListener('loadeddata', play);
      el.removeEventListener('canplay', play);
      el.removeEventListener('pause', play);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointerdown', play);
      window.removeEventListener('keydown', play);
    };
  }, [ref]);
}
