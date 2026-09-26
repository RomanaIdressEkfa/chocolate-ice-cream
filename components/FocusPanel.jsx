'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAutoplay from './useAutoplay';

gsap.registerPlugin(ScrollTrigger);

/**
 * Footage beside its copy, both inside the shared container so the section
 * lines up with the navigation above it. The card eases down to its resting
 * size as the section arrives.
 */
export default function FocusPanel({ id, eyebrow, lines, body, note, video, side = 'right' }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 82%',
            end: 'top 25%',
            scrub: 1.3,
          },
          defaults: { ease: 'none' },
        })
        .fromTo(
          '.focus__frame',
          { scale: 1.1, yPercent: 6, autoAlpha: 0.4 },
          { scale: 1, yPercent: 0, autoAlpha: 1 },
          0
        )
        .from('.focus__eyebrow', { autoAlpha: 0, y: 26 }, 0.15)
        .from('.focus__line', { yPercent: 112, stagger: 0.08 }, 0.22)
        .from('.focus__body', { autoAlpha: 0, y: 28 }, 0.42)
        .from('.focus__note', { autoAlpha: 0, y: 20 }, 0.55);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`focus focus--${side}`} id={id} ref={root}>
      <div className="focus__inner">
        <div className="focus__frame">
          <video
            ref={media}
            className="focus__video"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
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
