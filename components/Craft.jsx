'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['Real cocoa', 'Small batch', 'Slow churned', 'No shortcuts'];

const stats = [
  { value: '72', label: 'hours of conching before a single bar is dipped' },
  { value: '04', label: 'ingredients on the label, and nothing else' },
  { value: '01', label: 'small kitchen, churning again every morning' },
];

export default function Craft() {
  const root = useRef(null);
  const row = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Endless band; the two halves are identical so -50% loops seamlessly.
      const loop = gsap.to(row.current, {
        xPercent: -50,
        ease: 'none',
        duration: 28,
        repeat: -1,
      });

      let settle;

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const direction = velocity < 0 ? -1 : 1;
          const boost = gsap.utils.clamp(1, 5, Math.abs(velocity) / 350);

          gsap.to(loop, { timeScale: direction * boost, duration: 0.3, overwrite: true });

          clearTimeout(settle);
          settle = setTimeout(() => {
            gsap.to(loop, { timeScale: direction, duration: 0.6, overwrite: true });
          }, 140);
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.craft__body',
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          },
          defaults: { ease: 'none' },
        })
        .from('.craft__eyebrow', { y: 24, autoAlpha: 0 }, 0)
        .from('.craft__line', { yPercent: 112 }, 0.05)
        .from('.craft__stat', { y: 40, autoAlpha: 0, stagger: 0.14 }, 0.25);

      return () => clearTimeout(settle);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="craft" ref={root}>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__row" ref={row}>
          {[0, 1].map((half) => (
            <span className="marquee__group" key={half}>
              {words.map((word) => (
                <span className="marquee__item" key={word}>
                  {word}
                  <i className="marquee__dot" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="craft__body">
        <div className="craft__head">
          <p className="craft__eyebrow">The craft</p>
          <h2 className="craft__title">
            <span className="craft__line-wrap">
              <span className="craft__line">Made slowly, on purpose.</span>
            </span>
          </h2>
        </div>

        <div className="craft__stats">
          {stats.map(({ value, label }) => (
            <div className="craft__stat" key={value}>
              <span className="craft__num">{value}</span>
              <span className="craft__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
