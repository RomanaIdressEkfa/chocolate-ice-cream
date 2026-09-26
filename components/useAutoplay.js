'use client';

import { useEffect } from 'react';

/**
 * Loads a background video only once it approaches the viewport, then keeps it
 * playing in every situation browsers allow.
 *
 * Mobile browsers refuse to preload several heavy videos at once, so each clip
 * starts with preload="none" and is fetched on demand here. Clips that scroll
 * far away are paused again to spare bandwidth and battery.
 */
export default function useAutoplay(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    let loaded = false;

    const play = () => {
      const attempt = el.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    };

    const load = () => {
      if (loaded) return;
      loaded = true;
      el.preload = 'auto';
      el.load();
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && loaded) play();
    };

    // Start fetching a screen early so it is ready by the time it is on show.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            load();
            play();
          } else if (loaded) {
            el.pause();
          }
        });
      },
      { rootMargin: '100% 0px' }
    );

    observer.observe(el);

    el.addEventListener('loadeddata', play);
    el.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', onVisibility);
    // Last resort: some browsers only allow playback after an interaction.
    window.addEventListener('pointerdown', play, { once: true });
    window.addEventListener('keydown', play, { once: true });

    return () => {
      observer.disconnect();
      el.removeEventListener('loadeddata', play);
      el.removeEventListener('canplay', play);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointerdown', play);
      window.removeEventListener('keydown', play);
    };
  }, [ref]);
}
