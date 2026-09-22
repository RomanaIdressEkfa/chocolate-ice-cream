'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageHero({ eyebrow, lines, intro }) {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.page-hero__eyebrow', { y: 24, autoAlpha: 0, duration: 0.8 })
        .from('.page-hero__line', { yPercent: 112, duration: 1.05, stagger: 0.09 }, 0.1)
        .from('.page-hero__intro', { y: 28, autoAlpha: 0, duration: 0.9 }, 0.45)
        .from('.page-hero__chunk', { autoAlpha: 0, scale: 0.86, duration: 1.2, stagger: 0.12 }, 0.2);

      gsap.to('.page-hero__chunk', {
        yPercent: -26,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="page-hero" ref={root}>
      <img
        className="page-hero__chunk page-hero__chunk--left"
        src="/images/ice-cream.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="page-hero__chunk page-hero__chunk--right"
        src="/images/ice-creamm.png"
        alt=""
        aria-hidden="true"
      />

      <div className="page-hero__inner">
        <p className="page-hero__eyebrow">{eyebrow}</p>

        <h1 className="page-hero__title">
          {lines.map((line) => (
            <span className="page-hero__line-wrap" key={line}>
              <span className="page-hero__line">{line}</span>
            </span>
          ))}
        </h1>

        {intro ? <p className="page-hero__intro">{intro}</p> : null}
      </div>
    </section>
  );
}
