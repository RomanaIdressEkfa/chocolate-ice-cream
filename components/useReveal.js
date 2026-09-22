'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll reveal used across the inner pages so every section enters
 * with the same motion as the home page.
 *   [data-reveal]        single element
 *   [data-reveal-group]  staggers its direct children
 */
export default function useReveal(ref) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 42,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          y: 46,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
