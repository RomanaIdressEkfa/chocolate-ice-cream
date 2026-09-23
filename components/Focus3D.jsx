'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import useAutoplay from './useAutoplay';
import { LogoMark } from './Icons';

/**
 * The card starts centred and oversized, makes one full turn as you scroll,
 * then straightens and settles into its resting place beside the copy. Two
 * faces with hidden backfaces keep the far half of the turn clean.
 */
export default function Focus3D({ id, eyebrow, lines, body, note, video }) {
  const root = useRef(null);
  const media = useRef(null);

  useAutoplay(media);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.7 });

  // One complete revolution, unwinding well before the section releases.
  const rotateY = useTransform(p, [0, 0.8], [0, 360]);

  // Angled through the turn, squared up at the end.
  const rotateX = useTransform(p, [0, 0.55, 0.9], [22, 18, 0]);
  const rotateZ = useTransform(p, [0, 0.55, 0.9], [-10, -7, 0]);

  // Big and centred at the start, settled to the left when it lands.
  const scale = useTransform(p, [0, 0.9], [1.16, 1]);
  const cardX = useTransform(p, [0, 0.9], ['23vw', '0vw']);
  const zoom = useTransform(p, [0, 1], [1.22, 1]);

  const copyOpacity = useTransform(p, [0.62, 0.88], [0, 1]);
  const copyY = useTransform(p, [0.62, 0.88], [44, 0]);

  return (
    <section className="focus-wrap focus-wrap--3d" ref={root}>
      <div className="focus focus--3d" id={id}>
        <div className="focus3d__stage">
          <motion.div
            className="focus3d__card"
            style={{ rotateY, rotateX, rotateZ, scale, x: cardX }}
          >
            <div className="focus3d__face focus3d__face--front">
              <motion.video
                ref={media}
                className="focus3d__video"
                style={{ scale: zoom }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src={video} type="video/mp4" />
              </motion.video>
            </div>

            <div className="focus3d__face focus3d__face--back" aria-hidden="true">
              <LogoMark className="focus3d__mark" />
            </div>
          </motion.div>
        </div>

        <motion.div className="focus__copy" style={{ opacity: copyOpacity, y: copyY }}>
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
        </motion.div>
      </div>
    </section>
  );
}
