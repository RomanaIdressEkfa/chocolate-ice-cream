'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAutoplay from './useAutoplay';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);
  const video = useRef(null);

  useAutoplay(video);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .from('[data-intro="nav"]', { y: -30, autoAlpha: 0, duration: 0.9 })
        .from('.hero__line', { yPercent: 115, duration: 1.1, stagger: 0.08 }, 0.15)
        .from('.hero__chunks--left', { x: -70, y: 40, autoAlpha: 0, duration: 1.3 }, 0.3)
        .from('.hero__chunks--right', { x: 70, y: -40, autoAlpha: 0, duration: 1.3 }, 0.4)
        .from('[data-intro="cue"]', { autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.8)
        .from('[data-intro="bottom"]', { y: 30, autoAlpha: 0, duration: 0.8 }, 0.85);

      // Sticky rather than pinned: no DOM is moved, so React stays happy and
      // the scroll distance is exactly the wrapper height.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.3,
          },
          defaults: { ease: 'none' },
        })
        .to('.hero__title--left', { xPercent: -16, autoAlpha: 0.3 }, 0)
        .to('.hero__title--right', { xPercent: 16, autoAlpha: 0.3 }, 0)
        .to('.hero__video', { scale: 1.07 }, 0)
        .to('.hero__chunks--left', { yPercent: -24, xPercent: -8, rotate: -6 }, 0)
        .to('.hero__chunks--right', { yPercent: 26, xPercent: 7, rotate: 5 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-wrap" ref={root}>
      <div className="hero" id="home">
        <video
          ref={video}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src="/videos/1-1.mp4" type="video/mp4" />
        </video>

        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__chunks hero__chunks--right" aria-hidden="true">
          <img src="/images/ice-creamm.png" alt="" />
        </div>

        <h1 className="hero__headline">
          <span className="hero__title hero__title--left">
            <span className="hero__line-wrap">
              <span className="hero__line">Chocolate</span>
            </span>
            <span className="hero__line-wrap">
              <span className="hero__line">makes</span>
            </span>
          </span>

          <span className="hero__title hero__title--right">
            <span className="hero__line-wrap">
              <span className="hero__line">Everything</span>
            </span>
            <span className="hero__line-wrap">
              <span className="hero__line">better.</span>
            </span>
          </span>
        </h1>

        <div className="hero__chunks hero__chunks--left">
          <img src="/images/ice-cream.png" alt="Chocolate chunks" />
        </div>
      </div>
    </section>
  );
}
