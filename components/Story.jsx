'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAutoplay from './useAutoplay';

gsap.registerPlugin(ScrollTrigger);

const lines = ['Dipped in', 'real dark', 'chocolate.'];

export default function Story() {
  const root = useRef(null);
  const video = useRef(null);

  useAutoplay(video);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cues = Array.from(document.querySelectorAll('.scroll-cue'));

    const ctx = gsap.context(() => {
      // The bar travels in from the right while the headline settles on the left.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 85%',
            end: 'top 12%',
            scrub: 1,
          },
          defaults: { ease: 'none' },
        })
        .from('.story__media', { xPercent: 72, autoAlpha: 0, rotate: 5 }, 0)
        .from('.story__eyebrow', { x: -40, autoAlpha: 0 }, 0)
        .from('.story__line', { yPercent: 112, stagger: 0.12 }, 0.05)
        .from('.story__body', { y: 34, autoAlpha: 0 }, 0.3)
        .from('.story__link', { y: 22, autoAlpha: 0 }, 0.42);

      // Chocolate accent drifts for depth.
      gsap.to('.story__chunk', {
        yPercent: -34,
        rotate: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // The hero's "Scroll Down" cues belong to the hero only.
      if (cues.length) {
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 85%',
          onEnter: () => gsap.to(cues, { autoAlpha: 0, duration: 0.4 }),
          onLeaveBack: () => gsap.to(cues, { autoAlpha: 1, duration: 0.4 }),
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="about" ref={root}>
      <div className="story__inner">
        <div className="story__text">
          <p className="story__eyebrow">The signature bar</p>

          <h2 className="story__title">
            {lines.map((line) => (
              <span className="story__line-wrap" key={line}>
                <span className="story__line">{line}</span>
              </span>
            ))}
          </h2>

          <p className="story__body">
            Slow-churned cream under a thick shell of seventy percent cocoa, finished
            with roasted hazelnut. Made in small batches, every single morning.
          </p>

          <a className="story__link" href="#shop">
            Explore the range
          </a>
        </div>

        <div className="story__media">
          <div className="story__card">
            <video
              ref={video}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            >
              <source src="/videos/1-1.mp4" type="video/mp4" />
            </video>
          </div>

          <img className="story__chunk" src="/images/ice-creamm.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
