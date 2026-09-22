'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { flavours } from '@/lib/flavours';

gsap.registerPlugin(ScrollTrigger);

export default function Flavours() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.flavours__line', {
        yPercent: 112,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      // Cards fly in from the outside: the first two from the left, the last
      // two from the right, each pair split between above and below.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.flavours__track',
          start: 'top 92%',
          end: 'top 32%',
          scrub: 1,
        },
        defaults: { ease: 'none' },
      });

      gsap.utils.toArray('.flavour').forEach((card, i) => {
        const fromLeft = i < 2;
        const fromTop = i % 2 === 0;

        tl.from(
          card,
          {
            xPercent: fromLeft ? -185 : 185,
            yPercent: fromTop ? -80 : 80,
            rotate: fromLeft ? -14 : 14,
            autoAlpha: 0,
          },
          i * 0.08
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="flavours" id="shop" ref={root}>
      <div className="flavours__head">
        <p className="flavours__eyebrow">Our flavours</p>
        <h2 className="flavours__title">
          <span className="flavours__line-wrap">
            <span className="flavours__line">Four ways to melt.</span>
          </span>
        </h2>
      </div>

      <div className="flavours__track">
        {flavours.map(({ index, name, note, chunk }) => (
          <article className="flavour" key={index}>
            <span className="flavour__index">{index}</span>

            <img className="flavour__chunk" src={chunk} alt="" aria-hidden="true" />

            <div className="flavour__foot">
              <h3 className="flavour__name">{name}</h3>
              <p className="flavour__note">{note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
