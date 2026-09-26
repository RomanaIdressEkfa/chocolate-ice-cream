'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = ['Let us talk', 'chocolate.'];

export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 82%',
            end: 'top 18%',
            scrub: 1,
          },
          defaults: { ease: 'none' },
        })
        .from('.contact__eyebrow', { y: 24, autoAlpha: 0 }, 0)
        .from('.contact__line', { yPercent: 112, stagger: 0.12 }, 0.05)
        .from('.contact__mail', { y: 28, autoAlpha: 0 }, 0.35);

      // The chunks drift in from both edges and meet behind the headline.
      const drift = {
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      };

      gsap.fromTo(
        '.contact__chunk--left',
        { xPercent: -46, yPercent: 26, rotate: -10 },
        { xPercent: 6, yPercent: -8, rotate: 4, ease: 'none', scrollTrigger: drift }
      );

      gsap.fromTo(
        '.contact__chunk--right',
        { xPercent: 46, yPercent: -22, rotate: 10 },
        { xPercent: -6, yPercent: 10, rotate: -5, ease: 'none', scrollTrigger: drift }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={root}>
      <img
        className="contact__chunk contact__chunk--left"
        src="/images/ice-cream.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="contact__chunk contact__chunk--right"
        src="/images/ice-creamm.png"
        alt=""
        aria-hidden="true"
      />

      <div className="contact__inner">
        <p className="contact__eyebrow">Say hello</p>

        <h2 className="contact__title">
          {lines.map((line) => (
            <span className="contact__line-wrap" key={line}>
              <span className="contact__line">{line}</span>
            </span>
          ))}
        </h2>

        <a className="contact__mail" href="mailto:romanaidressekfa@gmail.com">
          romanaidressekfa@gmail.com
        </a>
      </div>
    </section>
  );
}
