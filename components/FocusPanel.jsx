'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAutoplay from './useAutoplay';

gsap.registerPlugin(ScrollTrigger);

/**
 * Full bleed video that closes into a window as you scroll while the footage
 * zooms in on the detail. Sticky rather than pinned, so nothing is moved in
 * the DOM and the scroll distance is simply the wrapper height.
 */
export default function FocusPanel({ id, eyebrow, lines, body, note, video, side = 'right' }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 861px)', () => {
        const closed =
          side === 'right'
            ? { '--ct': '16%', '--cr': '7%', '--cb': '16%', '--cl': '53%' }
            : { '--ct': '16%', '--cr': '53%', '--cb': '16%', '--cl': '7%' };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
            defaults: { ease: 'none' },
          })
          .fromTo(
            '.focus__frame',
            { '--ct': '0%', '--cr': '0%', '--cb': '0%', '--cl': '0%', '--crad': '0px' },
            { ...closed, '--crad': '28px', duration: 0.62 },
            0
          )
          .fromTo('.focus__video', { scale: 1 }, { scale: 1.4, duration: 1 }, 0)
          .from('.focus__eyebrow', { autoAlpha: 0, y: 26, duration: 0.18 }, 0.34)
          .from('.focus__line', { yPercent: 112, stagger: 0.06, duration: 0.2 }, 0.4)
          .from('.focus__body', { autoAlpha: 0, y: 28, duration: 0.18 }, 0.56)
          .from('.focus__note', { autoAlpha: 0, y: 20, duration: 0.18 }, 0.66);
      });

      mm.add('(max-width: 860px)', () => {
        gsap.from('.focus__copy > *', {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.focus__copy', start: 'top 88%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [side]);

  return (
    <section className="focus-wrap" ref={root}>
      <div className={`focus focus--${side}`} id={id}>
        <div className="focus__frame">
          <video
            ref={media}
            className="focus__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <div className="focus__copy">
          <p className="focus__eyebrow">{eyebrow}</p>

          <h2 className="focus__title">
            {lines.map((line) => (
              <span className="focus__line-wrap" key={line}>
                <span className="focus__line">{line}</span>
              </span>
            ))}
          </h2>

          <p className="focus__body">{body}</p>
          {note ? <p className="focus__note">{note}</p> : null}
        </div>
      </div>
    </section>
  );
}
