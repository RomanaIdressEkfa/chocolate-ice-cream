'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAutoplay from './useAutoplay';

gsap.registerPlugin(ScrollTrigger);

/**
 * The footage arrives filling the screen, holds there while you scroll, then
 * shrinks into its place in the container beside the copy.
 *
 * The section sticks so the large state can be held for as long as we like:
 * the wrapper height is the scroll budget, and the timeline decides how much
 * of it is spent holding, shrinking and settling.
 */
export default function FocusPanel({ id, eyebrow, lines, body, note, video, side = 'right' }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1081px)', () => {
        const slot = root.current.querySelector('.focus__frame-slot');

        // Measured against the slot, which never moves, so the numbers hold
        // at any window size and can be recalculated on resize.
        const coverScale = () => {
          const r = slot.getBoundingClientRect();
          return Math.max(window.innerWidth / r.width, window.innerHeight / r.height);
        };

        const toCentre = () => {
          const r = slot.getBoundingClientRect();
          return window.innerWidth / 2 - (r.left + r.width / 2);
        };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
            defaults: { ease: 'none' },
          })
          // Nothing happens for the first third: the footage simply fills
          // the screen while you scroll.
          .fromTo(
            '.focus__frame',
            { scale: coverScale, x: toCentre, borderRadius: 0 },
            { scale: 1, x: 0, borderRadius: 28, duration: 0.34 },
            0.36
          )
          .from('.focus__eyebrow', { autoAlpha: 0, y: 26, duration: 0.07 }, 0.68)
          .from('.focus__line', { yPercent: 112, stagger: 0.04, duration: 0.09 }, 0.72)
          .from('.focus__body', { autoAlpha: 0, y: 28, duration: 0.07 }, 0.8)
          .from('.focus__note', { autoAlpha: 0, y: 20, duration: 0.07 }, 0.84)
          // A moment settled in place before the section lets go.
          .to({}, { duration: 0.12 }, 0.88);
      });

      mm.add('(max-width: 1080px)', () => {
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
  }, []);

  return (
    <section className="focus-wrap focus-wrap--panel" ref={root}>
      <div className={`focus focus--${side}`} id={id}>
        <div className="focus__inner">
          <div className="focus__frame-slot">
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
      </div>
    </section>
  );
}
